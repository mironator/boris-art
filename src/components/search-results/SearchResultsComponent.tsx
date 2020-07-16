import React from 'react'

import { useArtworkSearchListData } from '@hooks/useArtworkData'

import useStyles from './styles'

type Props = {
  query: string
}

const SearchResultsComponent: React.FC<Props> = ({ query }) => {
  // const classes = useStyles({})

  console.log('[INFO] SearchResultsComponent:query', query)

  const { data, isError, isLoading } = useArtworkSearchListData({ query, offset: 0, limit: 5 })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if(!data.length) {
    return <p>No results found</p>
  }
  return (
    <>
      <p>SearchResultsComponent {query}</p>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </>
  )
}

export default SearchResultsComponent
