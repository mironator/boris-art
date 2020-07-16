import React, { useContext } from 'react'
import SearchLayout from '@components/layout/SearchLayout'
import SearchResultsComponent from '@components/search-results'

import { SearchContext } from '@components/layout/SearchLayout'

const Artworks: React.FC<unknown> = () => {
  const query = useContext<string>(SearchContext)
  return (
    <SearchLayout>
      <SearchResultsComponent query={query} />
    </SearchLayout>
  )
}

export default Artworks
