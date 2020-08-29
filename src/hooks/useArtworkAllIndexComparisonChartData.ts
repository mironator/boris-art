import _ from 'lodash'
import { gql, useQuery } from '@apollo/client'
import { Artist } from '@interfaces/index'

const GET_COMPARISON_CHART_DATA = gql`
  query GET_COMPARISON_CHART_DATA(
    $algorithm: String
    $artists: [ArtistInput]
    $finance: [FinanceInput]
  ) {
    artistIndexChartData(algorithm: $algorithm, artists: $artists, finance: $finance) {
      artistData {
        artist {
          id
          name
          mediumTypes
        }
        data
      }
    }
  }
`

type VariablesType = {
  algorithm: string
  artists: { id: number }[]
  finance: { code: string }[]
}

type ChartData = {
  comparisonChartData: {
    artistData: { artist: Artist; data: { date: string; index: number } }[]
    financeData: { quote: { name: string }; data: { date: string; index: number } }[]
  }
}

// @ts-ignore
const useArtworkAllIndexComparisonChartData = (algorithm, artists, finance) => {
  const { loading, data, error } = useQuery<ChartData, VariablesType>(GET_COMPARISON_CHART_DATA, {
    variables: {
      algorithm,
      artists: artists.map((a: Artist) => ({
        id: a.id,
      })),
      finance: finance.map((i: { code: string }) => ({ code: i.code })),
    },
  })

  const chartData = _.get(data, 'artistIndexChartData')

  return { data: chartData, loading, error }
}

export default useArtworkAllIndexComparisonChartData
