import React, { useState, useCallback } from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { useDebounce } from 'use-debounce'

import SearchResults from '@components/search-results/SearchResultsComponent'
import HeaderWithSearch from './header-with-search/HeaderWithSearch'
import Footer from './Footer'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      marginBottom:
        ((process.env.REACT_APP_NPM_REGISTRY_API_MOCKS_ENABLED === 'true' ||
          process.env.REACT_APP_NPM_API_MOCKS_ENABLED === 'true') &&
          '50px') ||
        '0',
    },
    searchContainer: {
      marginTop: 80,
    },
    content: {
      margin: '0px auto',
      [theme.breakpoints.up('xs')]: {
        maxWidth: '1180px', // adjust for regular and small screens (default fixed maxWidth)
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: '90vw', // adjust for wide screens
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: '70vw', // adjust for very-wide screens
      },
    },
    mockWarning: {
      position: 'fixed',
      bottom: 0,
      width: 200,
      left: '50%',
      transform: 'translate(-50%, 0)',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      padding: 4,
      textAlign: 'center',
      borderRadius: '8px 8px 0px 0px',
    },
  })
)

export const SearchContext = React.createContext({});

const MainLayout: React.FC<unknown> = ({ children }) => {
  const [query, setQuery] = useState<string>('')
  const [debouncedQuery] = useDebounce(query, 1e3)

  const onInputChange = useCallback((query) => { setQuery(query) }, [])

  const classes = useStyles({})
  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <SearchContext.Provider value={debouncedQuery}>
          <HeaderWithSearch onInputChange={onInputChange} />
          {children}
          <Footer data-section="footer" />
        </SearchContext.Provider>
      </div>
    </>
  )
}

export default MainLayout
