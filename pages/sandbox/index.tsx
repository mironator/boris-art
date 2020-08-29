import React from 'react'
import { NextPage } from 'next'
import { Typography } from '@material-ui/core'

import Layout from '@components/layout/Layout'
import ArtworkIndexCompareChart from './ArtworkIndexCompareChart'

const Sandbox: NextPage = () => {
  return (
    <Layout>
      <Typography variant="h4" component="h4" style={{ marginTop: 24, marginBottom: 24 }}>
        Sandbox
      </Typography>
      <ArtworkIndexCompareChart />
    </Layout>
  )
}

export default Sandbox
