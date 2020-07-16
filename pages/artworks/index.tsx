import React from 'react'
import SearchLayout from '@components/layout/SearchLayout'
import SearchResultsComponent from '@components/search-results'

import { SearchContext } from '@components/layout/SearchLayout'

const Artworks: React.FC<unknown> = () => {
  return (
    <SearchLayout>
      <SearchContext.Consumer>
        {(query: string) => <SearchResultsComponent query={query} />}
      </SearchContext.Consumer>
    </SearchLayout>
  )
}

export default Artworks
