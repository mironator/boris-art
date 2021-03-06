import useSWR from 'swr'
import queryString from 'query-string'

import fetcher from '@utils/fetcher'
import { Artwork as IArtwork, ArtworkListEntity, ArtworkEntity } from '@interfaces/index'

import Artwork from '@models/Artwork'

import sortTypes from '../models/SortTypes'
import mediumTypes from './mediumTypes'

export type ChartData = {
  data: IArtwork[]
  isLoading: boolean
  isError: boolean
} & {
  // TODO: Make it to be ListMeta, but optional somehow
  total?: number
}

type ListInputType = {
  artistId: number
  offset: number
  limit: number
  sort: keyof typeof sortTypes
  medium: keyof typeof mediumTypes
}
type SearchListInputType = { artistId?: number; query: string; offset: number; limit: number }

const getSort = (sort: keyof typeof sortTypes): string => {
  if (sort === sortTypes.featured) return ''

  return `&sort=${sort}`
}

const getMedium = (medium: keyof typeof mediumTypes): string => {
  if (medium === mediumTypes.all) return ''

  return `&medium_final[eq]=${medium}`
}

export const useArtworkListData: (params: ListInputType) => ChartData = ({
  artistId,
  offset,
  limit,
  sort,
  medium,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: artworkData, error, isValidating } = useSWR<ArtworkListEntity>(
    `/api/artworks?${queryString.stringify({
      'artist_id[eq]': artistId,
      offset,
      limit,
      'lot_image_presigned_url[empty]': false,
    })}${getSort(sort)}${getMedium(medium)}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  return {
    data: (artworkData?.data || []).map((d: ArtworkEntity) => Artwork.fromEntity(d)),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // ...artworkData?.meta,
    isLoading: isValidating,
    isError: !!error,
  }
}

export const useArtworkSearchListData: (params: SearchListInputType) => ChartData = ({
  artistId,
  query,
  offset,
  limit,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: artworkData, error, isValidating } = useSWR<ArtworkListEntity>(
    `/api/artworks/search?${queryString.stringify({
      'query[eq]': query,
      'artist_id[eq]': artistId,
      offset,
      limit,
    })}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  return {
    data: (artworkData?.data || []).map((d: ArtworkEntity) => Artwork.fromEntity(d)),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...artworkData?.meta,
    isLoading: isValidating,
    isError: error,
  }
}

export default { useArtworkListData, useArtworkSearchListData }
