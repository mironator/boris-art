import _ from 'lodash'
import useSWR from 'swr'

import fetcher from '@utils/fetcher'
import {
  PriceMomentumChartDatum as IPriceMomentumChartDatum,
  PriceMomentumChartDatumEntity,
} from '@interfaces/index'
import PriceMomentumChartDatum from '@models/PriceMomentumChartDatum'

export type ChartData = {
  data: IPriceMomentumChartDatum[]
  isLoading: boolean
  isError: boolean
}

const useChartData: (artistId: number) => ChartData = (artistId) => {
  const { data, error } = useSWR(`/api/charts/price-momentum/${artistId}`, fetcher)

  return {
    data: (data || []).map((d: PriceMomentumChartDatumEntity) =>
      PriceMomentumChartDatum.fromEntity(d)
    ),
    isLoading: !error && !data,
    isError: error,
  }
}

export default useChartData
