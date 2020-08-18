import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'

import Search from '@components/search-similar-artworks/Search'
import Results from '@components/search-similar-artworks/Results'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#868e96',
    },
  },
  shape: {
    borderRadius: 0,
  },
})

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 100,
    paddingLeft: 60,
    paddingRight: 60,
  },
}))

const Page: React.FC<unknown> = () => {
  const classes = useStyles()

  // eslint-disable-next-line
  const onSearch = (cfg: unknown) => console.log('onSearch', cfg)
  // eslint-disable-next-line
  const onReset = () => console.log('onReset')

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Search onSearch={onSearch} onReset={onReset} />
          </Grid>

          <Grid item xs={7}>
            <Results />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default Page
