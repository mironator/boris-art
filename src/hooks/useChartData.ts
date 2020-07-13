import useSWR from 'swr'

import fetcher from '@utils/fetcher'
import {
  ArtworkIndexChartDatum as IArtworkIndexChartDatum,
  PriceMomentumChartDatum as IPriceMomentumChartDatum,
  ArtworkIndexChartDatumEntity,
  PriceMomentumChartDatumEntity,
} from '@interfaces/index'
import PriceMomentumChartDatum from '@models/PriceMomentumChartDatum'
import ArtworkIndexChartDatum from '@models/ArtworkIndexChartDatum'

export type PriceMomentumAndVolumeChartData = {
  data: IPriceMomentumChartDatum[]
  isLoading: boolean
  isError: boolean
}

export type ArtworkIndexChartData = {
  data: IArtworkIndexChartDatum[]
  isLoading: boolean
  isError: boolean
}

export const usePriceMomentumAndVolumeChartData: (
  artistId: number
) => PriceMomentumAndVolumeChartData = (artistId) => {
  const { data, error } = useSWR(`/api/charts/price-momentum/${artistId}`, fetcher)

  return {
    data: (data || []).map((d: PriceMomentumChartDatumEntity) =>
      PriceMomentumChartDatum.fromEntity(d)
    ),
    isLoading: !error && !data,
    isError: error,
  }
}

export const useArtworkIndexChartData: (artistId: number) => ArtworkIndexChartData = (artistId) => {
  const { data, error } = useSWR(`/api/charts/artwork-index/${artistId}`, fetcher)

  return {
    data: (data || []).map((d: ArtworkIndexChartDatumEntity) =>
      ArtworkIndexChartDatum.fromEntity(d)
    ),
    isLoading: !error && !data,
    isError: error,
  }
}

export default { usePriceMomentumAndVolumeChartData, useArtworkIndexChartData }
