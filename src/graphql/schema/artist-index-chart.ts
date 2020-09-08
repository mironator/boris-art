import _ from 'lodash'
import { gql } from 'apollo-server-micro'

import Artist from '@models/Artist'
import { ArtistEntity, MediumType } from '@interfaces/index'
import { INDICES, IndexName, SNP500, GOLD_PRICE, DOW_JONES, MSCI } from '@models/Stock'

export const typeDef = gql`
  extend type Query {
    artistIndexChartData(
      algorithms: [String]
      artists: [ArtistInput]
      finance: [FinanceInput]
    ): ArtistIndexChartData
  }

  type ArtistIndexData {
    artist: Artist
    data: JSON
  }

  type ArtistIndexChartData {
    artistData: [ArtistIndexData]
    financeData: [FinanceData] @cacheControl(maxAge: 86400)
  }
`

export const resolvers = {
  Query: {
    // @ts-ignore
    artistIndexChartData: (_, { algorithm, artists, finance }) => {
      // console.log('[INFO] artistIndexChartData', algorithm, artists, finance)
      return {
        artistData: artists.map((artist: unknown) => ({
          artist,
          data: {},
        })),
        financeData: finance.map((quote: unknown) => ({
          quote,
          data: [],
        })),
      }
    },
  },

  ArtistIndexData: {
    artist: async (parent: unknown): Promise<Artist | null> => {
      const artistId = _.get(parent, 'artist.id')
      const apiRes = await fetch(`http://54.156.225.113:8000/v1/artist/${artistId}`)
      const data = await apiRes.json()
      const entity = _.get(data, 'artist[0]') as ArtistEntity

      return entity ? Artist.fromEntity(entity) : null
    },

    // @ts-ignore
    data: async (parent, args, context, info): Promise<unknown> => {
      const artistId = _.get(parent, 'artist.id')
      const algorithms: string[] = _.get(info, 'variableValues.algorithms', [])
      console.log('[INFO] data.algorithm', info.variableValues.algorithms)

      const apiRes = await fetch(
        `http://54.156.225.113:8000/v1/artist-medium-list?artist_id[eq]=${artistId}`
      )
      const data = await apiRes.json()
      const mediumList = [
        '',
        ...(_.get(data, 'payload.artist_medium_list')?.map(
          (item: { medium: MediumType }) => item.medium
        ) as MediumType[]),
      ]

      const foo = {}

      await Promise.all(
        algorithms.map(async (algorithm: string) => {
          // @ts-ignore
          foo[algorithm] = {}

          return Promise.all(
            mediumList.map(async (medium) => {
              const res = await fetch(
                `http://54.156.225.113:8000/v1/${algorithm}-chart/?artist_id[eq]=${artistId}&medium[eq]=${medium}`
              )
              const chartData = await res.json()
              const bar = _.get(chartData, `payload.${algorithm.replace(/-/gi, '_')}_chart`)
              const baz = medium === '' ? 'all' : medium
              // @ts-ignore
              foo[algorithm][baz] = bar
              return bar
            })
          )
        })
      )
      return foo
    },
  },

  FinanceData: {
    quote: async (parent: unknown) => {
      // TODO: fetch more fields
      const name = _.get(parent, 'quote.name') as IndexName
      return INDICES[name]
    },
    data: async (parent: unknown): Promise<unknown> => {
      const name = _.get(parent, 'quote.name') as IndexName
      const { code } = INDICES[name]

      if (code === INDICES.SNP500.code) {
        return SNP500()
      }
      if (code === INDICES.GOLD.code) {
        return GOLD_PRICE()
      }
      if (code === INDICES.DOW_JONES.code) {
        return DOW_JONES()
      }
      if (code === INDICES.MSCI_WORLD_REAL_ESTATE.code) {
        return MSCI()
      }

      return []
    },
  },
}

export default typeDef
