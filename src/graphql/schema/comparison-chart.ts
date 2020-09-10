import _ from 'lodash'
import { gql } from 'apollo-server-micro'

import Artist from '@models/Artist'
import { ArtistEntity } from '@interfaces/index'

export const typeDef = gql`
  extend type Query {
    comparisonChartData(artists: [ArtistInput], finance: [FinanceInput]): ComparisonChartDatum
  }

  input ArtistInput {
    id: Int
  }

  input FinanceInput {
    name: String
  }

  type ArtistData {
    artist: Artist
    data: [IndexChartDatum]
  }

  type SNPDatum {
    date: Date
    open: Float
    high: Float
    low: Float
    close: Float
    adjClose: Float
    volume: Float
    index: Float
  }

  type Quote {
    name: String
    code: String
  }

  type FinanceData {
    quote: Quote
    data: [SNPDatum]
  }

  type ComparisonChartDatum {
    artistData: [ArtistData]
    financeData: [FinanceData] @cacheControl(maxAge: 86400)
  }

  type IndexChartDatum {
    date: Date
    index: Float
    medium: String
    volume: Float
  }
`

export const resolvers = {
  Query: {
    // @ts-ignore
    comparisonChartData: (_, { artists, finance }) => {
      return {
        artistData: artists.map((artist: unknown) => ({
          artist,
          data: [],
        })),
        financeData: finance.map((quote: unknown) => ({
          quote,
          data: [],
        })),
      }
    },
  },

  ArtistData: {
    artist: async (parent: unknown): Promise<Artist | null> => {
      const artistId = _.get(parent, 'artist.id')
      const apiRes = await fetch(`http://54.156.225.113:8000/v1/artist/${artistId}`)
      const data = await apiRes.json()
      const entity = _.get(data, 'artist[0]') as ArtistEntity

      return entity ? Artist.fromEntity(entity) : null
    },

    // @ts-ignore
    data: async (parent): Promise<unknown> => {
      const {
        artist: { id },
      } = parent

      // console.log('[INFO] getting data', id)

      const params = {
        artwork_index_comparison_chart: [
          {
            artist_id: id,
            medium: null,
          },
        ],
      }

      const apiRes = await fetch(`http://54.156.225.113:8000/v1/artwork-index-comparison-chart/`, {
        method: 'POST',
        body: JSON.stringify(params),
      })
      const data = await apiRes.json()

      // console.log('[INFO] comparisonChartData.data')
      return _.get(data, 'payload.artwork_index_comparison_chart')
    },
  },
}

export default typeDef
