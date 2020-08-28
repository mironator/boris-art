import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import withApollo from 'next-with-apollo'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

import theme from '@theme/theme'
import { SERVER } from '@config/index'

type Props = AppProps & { apollo: ApolloClient<InMemoryCache> }

const App: React.FC<Props> = (props) => {
  const { Component, pageProps, apollo } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      {/* 
        // @ts-ignore */}
      <ApolloProvider client={apollo}>
        <Head>
          <title>Boris Art</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}

export default withApollo(({ initialState }) => {
  return new ApolloClient({
    uri: SERVER,
    cache: new InMemoryCache().restore(initialState || {}),
  })
})(App)
