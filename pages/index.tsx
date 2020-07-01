import React from 'react'
import { Grid } from '@material-ui/core'
import Link from 'next/link'

import Layout from '@components/Layout'
import Lightbox from '@components/Lightbox'

const Index: React.FC<unknown> = () => {
  return (
    <Layout>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item style={{ height: '300px' }}>
          <Lightbox src="https://i.imgur.com/fsyrScY.jpg" name="Test" />
        </Grid>
        <Grid item xs={3}>
          <Link href="/search">
            <a>Search</a>
          </Link>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Index
