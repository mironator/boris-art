import React from 'react'
import { NextPage } from 'next'
import { Typography } from '@material-ui/core'

import Layout from '@components/layout/Layout'
import ArtworkIndexAllCharts from '@components/artist-analytics/charts/ArtworkIndexAllCharts'
import mediumTypes from '@hooks/mediumTypes'

const Sandbox: NextPage = () => {
  const id = 3505
  const mediumList = [
    'other',
    'paintings',
    'photographs',
    'prints',
    'sculpture',
    'worksOnPaper',
  ] as Array<keyof typeof mediumTypes>

  return (
    <Layout>
      <Typography variant="h4" component="h4" style={{ marginTop: 24, marginBottom: 24 }}>
        Sandbox
      </Typography>
      <Typography variant="h4" component="h4" style={{ marginTop: 24, marginBottom: 5 }}>
        Artwork Index Chart
      </Typography>
      <ArtworkIndexAllCharts artistId={id} mediumList={mediumList} />
      <Typography variant="h4" component="h4" style={{ marginTop: 24, marginBottom: 5 }}>
        Artwork Index Hedonic Chart
      </Typography>
      <ArtworkIndexAllCharts artistId={id} mediumList={[]} type="hedonic" />
      <Typography variant="h4" component="h4" style={{ marginTop: 24, marginBottom: 5 }}>
        Artwork Index Repeat Sales Weighted Chart
      </Typography>
      <ArtworkIndexAllCharts artistId={id} mediumList={[]} type="repeat-sales-weighted" />
      <Typography variant="h4" component="h4" style={{ marginTop: 24, marginBottom: 5 }}>
        Artwork Index Repeat Sales Unweighted Chart
      </Typography>
      <ArtworkIndexAllCharts artistId={id} mediumList={[]} type="repeat-sales-unweighted" />
    </Layout>
  )
}

export default Sandbox
