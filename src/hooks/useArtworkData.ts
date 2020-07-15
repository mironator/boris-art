import useSWR from 'swr'
import queryString from 'query-string'

import fetcher from '@utils/fetcher'
import { Artwork as IArtwork, ArtworkListEntity, ArtworkEntity, ListMeta } from '@interfaces/index'

import Artwork from '@models/Artwork'

export type ChartData = {
  data: IArtwork[]
  isLoading: boolean
  isError: boolean
} & ListMeta

type ListInputType = { artistId: number; offset: number; limit: number }
type SearchListInputType = { artistId: number; query: string; offset: number; limit: number }

const useArtworkListData: (params: ListInputType) => ChartData = ({ artistId, offset, limit }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: artworkData, error } = useSWR<ArtworkListEntity>(
    `/api/artworks${queryString.stringify({ artistId, offset, limit })}`,
    fetcher
  )

  return {
    data: (artworkData?.data || []).map((d: ArtworkEntity) => Artwork.fromEntity(d)),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...artworkData!.meta,
    isLoading: !error && !artworkData?.data,
    isError: error,
  }
}

const useArtworkSearchListData: (params: SearchListInputType) => ChartData = ({
  artistId,
  query,
  offset,
  limit,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: artworkData, error } = useSWR<ArtworkListEntity>(
    `/api/artworks${queryString.stringify({ 'query[eq]': query, artistId, offset, limit })}`,
    fetcher
  )

  return {
    data: (artworkData?.data || []).map((d: ArtworkEntity) => Artwork.fromEntity(d)),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...artworkData!.meta,
    isLoading: !error && !artworkData?.data,
    isError: error,
  }
}

export default { useArtworkListData, useArtworkSearchListData }
