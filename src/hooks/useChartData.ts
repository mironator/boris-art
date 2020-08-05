import useSWR from 'swr'

import fetcher from '@utils/fetcher'
import {
  ArtworkIndexChartDatum as IArtworkIndexChartDatum,
  PriceMomentumChartDatum as IPriceMomentumChartDatum,
  CompoundAnnualReturnsChartDatum as ICompoundAnnualReturnsChartDatum,
  ReturnsVsPeriodChartDatum as IReturnsVsPeriodChartDatum,
  ComparablesChartDatum as IComparablesChartDatum,
  ArtworkValueChartDatum as IArtworkValueChartDatum,
  ArtworkIndexChartDatumEntity,
  PriceMomentumChartDatumEntity,
  CompoundAnnualReturnsChartDatumEntity,
  ReturnsVsPeriodChartDatumEntity,
  ComparablesChartDatumEntity,
} from '@interfaces/index'
import PriceMomentumChartDatum from '@models/PriceMomentumChartDatum'
import ArtworkIndexChartDatum from '@models/ArtworkIndexChartDatum'
import CompoundAnnualReturnsChartDatum from '@models/CompoundAnnualReturnsChartDatum'
import ReturnsVsPeriodChartDatum from '@models/ReturnsVsPeriodChartDatum'
import ComparablesChartDatum from '@models/ComparablesChartDatum'
import ArtworkValueChartDatum from '@models/ArtworkValueChartDatum'

import mediumTypes from './mediumTypes'

export type ChartData<T> = {
  data: T
  isLoading: boolean
  isError: boolean
}

export type PriceMomentumAndVolumeChartData = ChartData<IPriceMomentumChartDatum[]>
export type ArtworkIndexChartData = ChartData<IArtworkIndexChartDatum[]>
export type ArtworkIndexChartAllData = ChartData<
  Array<{
    data: IArtworkIndexChartDatum[]
    name: string
  }>
>
export type CompoundAnnualReturnsChartData = ChartData<ICompoundAnnualReturnsChartDatum[]>
export type ReturnsVsPeriodChartData = ChartData<IReturnsVsPeriodChartDatum[]>
export type ComparablesChartData = ChartData<IComparablesChartDatum[]>
export type ArtworkValueChartData = ChartData<IArtworkValueChartDatum>

const getMedium = (medium: string): string => {
  if (medium === mediumTypes.all) return ''

  return `?medium[eq]=${medium}`
}

export const usePriceMomentumAndVolumeChartData: (
  artistId: number
) => PriceMomentumAndVolumeChartData = (artistId) => {
  const { data, error } = useSWR(`/api/charts/price-momentum/${artistId}`, fetcher, {
    revalidateOnFocus: false,
  })

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
  medium: keyof typeof mediumTypes
) => ArtworkIndexChartData = (artistId, medium) => {
  const { data, error } = useSWR(
    `/api/charts/artwork-index/${artistId}${getMedium(medium)}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  return {
    data: (data || []).map((d: ArtworkIndexChartDatumEntity) =>
      ArtworkIndexChartDatum.fromEntity(d)
    ),
    isLoading: !error && !data,
    isError: error,
  }
}

export const useArtworkIndexChartAllData: (
  artistId: number,
  mediumList: string[]
) => ArtworkIndexChartAllData = (artistId, mediumList) => {
  const allData = mediumList.map((item) => ({
    ...useSWR(`/api/charts/artwork-index/${artistId}${getMedium(item)}`, fetcher, {
      revalidateOnFocus: false,
    }),
    name: item,
  }))

  return {
    data: allData
      .filter(({ data }) => data && data.length)
      .map(({ name, data }) => ({
        name,
        data: data.map((d: ArtworkIndexChartDatumEntity) => ArtworkIndexChartDatum.fromEntity(d)),
      })),
    isLoading: allData.some((item) => item.isValidating),
    isError: allData.some((item) => item.error),
  }
}

export const useCompoundAnnualReturnsChartData: (
  artistId: number
) => CompoundAnnualReturnsChartData = (artistId) => {
  const { data, error } = useSWR(`/api/charts/compound-annual-returns/${artistId}`, fetcher, {
    revalidateOnFocus: false,
  })

  return {
    data: (data || []).map((d: CompoundAnnualReturnsChartDatumEntity) =>
      CompoundAnnualReturnsChartDatum.fromEntity(d)
    ),
    isLoading: !error && !data,
    isError: error,
  }
}

export const useReturnVsPeriodData: (artistId: number) => ReturnsVsPeriodChartData = (artistId) => {
  const { data, error } = useSWR(`/api/charts/returns-vs-period/${artistId}`, fetcher, {
    revalidateOnFocus: false,
  })

  return {
    data: (Array.isArray(data) ? data : []).map((d: ReturnsVsPeriodChartDatumEntity) =>
      ReturnsVsPeriodChartDatum.fromEntity(d)
    ),
    isLoading: !error && !data,
    isError: error,
  }
}

export const useComparablesChartData: (artworkId: number) => ComparablesChartData = (artworkId) => {
  const { data, error } = useSWR(`/api/charts/comparables/${artworkId}`, fetcher, {
    revalidateOnFocus: false,
  })

  return {
    data: (data || []).map((d: ComparablesChartDatumEntity) => ComparablesChartDatum.fromEntity(d)),
    isLoading: !error && !data,
    isError: error,
  }
}

export const useArtworkValueChartData: (artworkId: number) => ArtworkValueChartData = (
  artworkId
) => {
  const { data, error } = useSWR(`/api/charts/artwork-value/${artworkId}`, fetcher, {
    revalidateOnFocus: false,
  })

  return {
    data: ArtworkValueChartDatum.fromEntity(data || { sales: [], values: [] }),
    isLoading: !error && !data,
    isError: error,
  }
}

export default {
  usePriceMomentumAndVolumeChartData,
  useArtworkIndexChartData,
  useCompoundAnnualReturnsChartData,
  useReturnVsPeriodData,
  useComparablesChartData,
}
