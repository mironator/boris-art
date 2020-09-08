import _ from 'lodash'
import { gql, useQuery, QueryResult } from '@apollo/client'
import { Artist } from '@interfaces/index'

const GET_CHART_DATA = gql`
  query GET_CHART_DATA($algorithms: [String], $artists: [ArtistInput], $finance: [FinanceInput]) {
    artistIndexChartData(algorithms: $algorithms, artists: $artists, finance: $finance) {
      artistData {
        artist {
          name
        }
        data
      }
      financeData {
        quote {
          name
        }
        data {
          date
          index
        }
      }
    }
  }
`

type VariablesType = {
  algorithms: string[]
  artists: { id: number }[]
  finance: { code: string }[]
}

type ChartData = {
  chartData: {
    artistData: { artist: Artist; data: { date: string; index: number } }[]
    financeData: { quote: { name: string }; data: { date: string; index: number } }[]
  }
}

// @ts-ignore
const useArtworkAllIndicesChartData: (
  algorithms: string[],
  artists?: Artist[],
  finance?: unknown[]
) => QueryResult = (algorithms, artists = [], finance = []) => {
  const { loading, data, error } = useQuery<ChartData, VariablesType>(GET_CHART_DATA, {
    errorPolicy: 'ignore',
    variables: {
      algorithms,
      artists: artists.map((a: Artist) => ({
        id: a.id,
      })),
      // @ts-ignore
      finance: finance.map((i: { code: string }) => ({ name: i.code })),
    },
  })

  const chartData = _.get(data, 'artistIndexChartData')

  return { data: chartData, loading, error }
}

export default useArtworkAllIndicesChartData
