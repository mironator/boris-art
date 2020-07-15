import React from 'react'

import { apiNpmsIo } from '../services/apis'
import { parseQueryString } from '../utils/url'

import Search from '../components/Search'

/**
 * You can pass the following (they are switchable - take same args + return same shape of objects):
 * - apiNpmRegistry().search
 * - apiNpmsIo().suggestions
 *
 * @param {Function} search function from the API
 */
const compileSearchPackage = (searchApi) => (...args) =>
  searchApi(...args).then(({ results }) => results)

const compileGoToPackage = (history) => (packageName) => history.push(`/package/${packageName}`)

const compileGoToSearchResults = (history) => (searchValue) =>
  history.push(`/search?q=${searchValue}`)

const SearchContainer = ({ history, location, className, style }) => (
  <div className={className} style={style}>
    Search
    {/* <Search
      searchQuery={parseQueryString(location.search).q || ''}
      fetchInfos={compileSearchPackage(apiNpmsIo().suggestions)}
      goToPackage={compileGoToPackage(history)}
      goToSearchResults={compileGoToSearchResults(history)}
    /> */}
  </div>
)

SearchContainer.defaultProps = {
  className: '',
  style: {},
}

export default SearchContainer
