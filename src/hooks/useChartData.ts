import useSWR from 'swr'

import fetcher from '@utils/fetcher'
import {
  ArtworkIndexChartDatum as IArtworkIndexChartDatum,
  PriceMomentumChartDatum as IPriceMomentumChartDatum,
  CompoundAnnualReturnsChartDatum as ICompoundAnnualReturnsChartDatum,
  ReturnsVsPeriodChartDatum as IReturnsVsPeriodChartDatum,
  ArtworkIndexChartDatumEntity,
  PriceMomentumChartDatumEntity,
  CompoundAnnualReturnsChartDatumEntity,
  ReturnsVsPeriodChartDatumEntity,
} from '@interfaces/index'
import PriceMomentumChartDatum from '@models/PriceMomentumChartDatum'
import ArtworkIndexChartDatum from '@models/ArtworkIndexChartDatum'
import CompoundAnnualReturnsChartDatum from '@models/CompoundAnnualReturnsChartDatum'
import ReturnsVsPeriodChartDatum from '@models/ReturnsVsPeriodChartDatum'

import mediumList from './mediumList'

export type ChartData<T> = {
  data: T[]
  isLoading: boolean
  isError: boolean
}

export type PriceMomentumAndVolumeChartData = ChartData<IPriceMomentumChartDatum>
export type ArtworkIndexChartData = ChartData<IArtworkIndexChartDatum>
export type CompoundAnnualReturnsChartData = ChartData<ICompoundAnnualReturnsChartDatum>
export type ReturnsVsPeriodChartData = ChartData<IReturnsVsPeriodChartDatum>

const getMedium = (medium: keyof typeof mediumList): string => {
  if (medium === mediumList.all) return ''

  return `?medium_final[eq]=${medium}`
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

export const useArtworkIndexChartData: (
  artistId: number,
  medium: keyof typeof mediumList
) => ArtworkIndexChartData = (artistId, medium) => {
  const { data, error } = useSWR(
    `/api/charts/artwork-index/${artistId}${getMedium(medium)}`,
    fetcher
  )

  return {
    data: (data || []).map((d: ArtworkIndexChartDatumEntity) =>
      ArtworkIndexChartDatum.fromEntity(d)
    ),
    isLoading: !error && !data,
    isError: error,
  }
}

export const useCompoundAnnualReturnsChartData: (
  artistId: number
) => CompoundAnnualReturnsChartData = (artistId) => {
  const { data, error } = useSWR(`/api/charts/compound-annual-returns/${artistId}`, fetcher)

  return {
    data: (data || []).map((d: CompoundAnnualReturnsChartDatumEntity) =>
      CompoundAnnualReturnsChartDatum.fromEntity(d)
    ),
    isLoading: !error && !data,
    isError: error,
  }
}

export const useReturnVsPeriodData: (artistId: number) => ReturnsVsPeriodChartData = (artistId) => {
  const { data, error } = useSWR(`/api/charts/returns-vs-period/${artistId}`, fetcher)

  return {
    data: (data || []).map((d: ReturnsVsPeriodChartDatumEntity) =>
      ReturnsVsPeriodChartDatum.fromEntity(d)
    ),
    isLoading: !error && !data,
    isError: error,
  }
}

export default {
  usePriceMomentumAndVolumeChartData,
  useArtworkIndexChartData,
  useCompoundAnnualReturnsChartData,
  useReturnVsPeriodData,
}
