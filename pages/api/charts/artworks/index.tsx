import React from 'react'
import SearchLayout from '@components/layout/SearchLayout'
import SearchResultsComponent from '@components/search-results'



const Artworks: React.FC<unknown> = () => {
  return (
    <SearchLayout>
      <SearchResultsComponent />
    </SearchLayout>
  )
}

export default Artworks
