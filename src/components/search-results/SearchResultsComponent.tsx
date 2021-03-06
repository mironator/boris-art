import React, { useContext } from 'react'

import { SearchContext } from '@components/layout/SearchLayout'
import { useArtworkSearchListData } from '@hooks/useArtworkData'

// import useStyles from './styles'

const SearchResultsComponent: React.FC<unknown> = () => {
  // const classes = useStyles({})
  const query = useContext<string>(SearchContext)

  console.log('[INFO] SearchResultsComponent:query', query)

  const { data, /* isError, */ isLoading } = useArtworkSearchListData({
    query,
    offset: 0,
    limit: 10,
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!data.length) {
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
