import useSWR from 'swr'
import { useState, useEffect } from 'react'
import AbortController from 'abort-controller'

import fetcher from '@utils/fetcher'
import { Artist as IArtist, ArtistEntity } from '@interfaces/index'
import Artist from '@models/Artist'

export type ArtistsData = {
  data: IArtist[]
  isLoading: boolean
  isError: boolean
}

export type ArtistsMediumList = {
  data: string[]
  isLoading: boolean
  isError: boolean
}

export const useArtistsListData: (inputText: string) => ArtistsData = (inputText) => {
  const [controllers, setControllers] = useState<AbortController[]>([])
  const controller = new AbortController()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: artistsData, error, isValidating } = useSWR<ArtistEntity[]>(
    `/api/artists?query=${inputText}`,
    (url) => fetcher(url, { signal: controller.signal }),
    {
      revalidateOnFocus: false,
    }
  )

  useEffect(() => {
    if (isValidating) {
      controllers.forEach((c) => c.abort())
      setControllers([controller])
    } else {
      setControllers([...controllers, controller])
    }
  }, [inputText])

  return {
    data: (artistsData || []).map((d: ArtistEntity) => Artist.fromEntity(d)),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    isLoading: isValidating,
    isError: !!error,
  }
}

export const useArtistsMediumList: (artistId: number) => ArtistsMediumList = (artistId) => {
  const { data, error, isValidating } = useSWR<string[]>(
    `/api/artists/medium-list/${artistId}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  return {
    data: data || [],
    isLoading: isValidating,
    isError: error,
  }
}
