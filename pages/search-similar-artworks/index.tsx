import React, { useState, useCallback } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import Search from '@components/search-similar-artworks/Search'
import Results from '@components/search-similar-artworks/Results'
import Layout from '@components/layout/Layout'

type Values = {
  artist: number
  image: string
  medium: string
  year: number
  height: number
  width: number
  depth: number
  unit: string
}

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 100,
    paddingLeft: 60,
    paddingRight: 60,
  },
}))

const Page: React.FC<unknown> = () => {
  const classes = useStyles()
  const [values, setValues] = useState<Values | {}>({})

  // eslint-disable-next-line
  const onSubmit = useCallback((values: Values) => {
    setValues(values)
  }, [])
  // eslint-disable-next-line
  const onReset = () => console.log('onReset')

  return (
    <Layout>
      <Container maxWidth="lg" className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            {/* 
          // @ts-ignore */}
            <Search onSubmit={onSubmit} onReset={onReset} />
          </Grid>

          <Grid item xs={7}>
            {/* 
          // @ts-ignore */}
            <Results values={values} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Page
