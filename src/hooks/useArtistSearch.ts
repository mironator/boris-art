import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { gql, useQuery } from '@apollo/client'

import Artist from '@models/Artist'

const GET_ARTISTS = gql`
  query GetArtists($query: String!) {
    artists(query: $query) {
      id
      name
      birth
      death
      artworksCount
      qualifier
      lotsCost
    }
  }
`

type VariablesType = {
  query: string
}

type ArtistsData = {
  artists: Artist[]
}

const useArtistSearch = () => {
  const [inputText, setInputText] = useState<string>('')
  const [debouncedInputText] = useDebounce(inputText, 300)

  const { data: { artists = [] } = { artists: [] } } = useQuery<ArtistsData, VariablesType>(
    GET_ARTISTS,
    {
      variables: { query: debouncedInputText },
    }
  )

  return { artists, setInputText }
}

export default useArtistSearch
