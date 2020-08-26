import _ from 'lodash'
import { gql } from 'apollo-server-micro'
import https from 'https'
import parse from 'csv-parse/lib/sync'

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
    code: String
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

      console.log('[INFO] getting data', id)

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

      // console.log('[INFO] data', data)
      return _.get(data, 'payload.artwork_index_comparison_chart')
    },
  },

  FinanceData: {
    quote: async (parent: unknown) => {
      // TODO: fetch more fields
      return { name: _.get(parent, 'quote.code') }
    },
    data: async (parent: unknown): Promise<unknown> => {
      const code = _.get(parent, 'quote.code')

      if (code === 'snp500') {
        return await SNP500()
      }

      return []
    },
  },
}

async function SNP500({
  from = new Date(1957, 3, 4).getTime(),
  to = new Date().getTime(),
  interval = '1mo',
}: {
  from?: number
  to?: number
  interval?: '1d' | '1wk' | '1mo'
} = {}): Promise<string> {
  console.log('[INFO] Querying SNP500')
  const snpData = await new Promise<string>(async (resolve, reject) => {
    const url = `https://query1.finance.yahoo.com/v7/finance/download/%5EGSPC?period1=${Math.floor(
      from / 1e3
    )}&period2=${Math.floor(to / 1e3)}&interval=${interval}&events=history`

    let data = ''
    const request = https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`))
        return
      }

      response.on('data', (chunk) => {
        data += chunk
      })

      response.on('end', () => resolve(data))
    })

    request.on('error', () => {
      reject()
    })
  })

  const foo = parse(snpData, {
    columns: ['date', 'open', 'high', 'low', 'close', 'adjClose', 'volume'],
    trim: true,
    fromLine: 2,
    // @ts-ignore
  }).map((i, _idx, arr) => ({ ...i, index: i.open / arr[0].open }))

  return foo
}

export default typeDef
