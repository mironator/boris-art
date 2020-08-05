import React from 'react'
import { Grid, Typography } from '@material-ui/core'

import { Artist } from '@interfaces/index'

// import ArtworkIndexChart from './charts/ArtworkIndexChart'
import ArtworkIndexAllCharts from './charts/ArtworkIndexAllCharts'
import ReturnsVSHoldingPeriodChart from './charts/ReturnsVSHoldingPeriodChart'
import CompoundAnnualReturns from './charts/CompoundAnnualReturns'

interface OwnProps {
  artistInfo: Artist
  mediumList: string[]
}

type Props = OwnProps

const ArtistAnalytics: React.FC<Props> = ({ artistInfo, mediumList }) => {
  if (!artistInfo.id) {
    return null
  }

  return (
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <Typography variant="h5" component="h2">
          Artwork Index
        </Typography>
      </Grid>
      <Grid item>
        <ArtworkIndexAllCharts artistId={artistInfo.id} mediumList={mediumList} />
      </Grid>
      {/* <Grid item>
        <Typography variant="h5" component="h2">
          Artwork Index
        </Typography>
      </Grid>
      <Grid item>
        <ArtworkIndexChart artistId={artistInfo.id} />
      </Grid> */}
      <Grid item>
        <Typography variant="h5" component="h2">
          Annual Returns vs Holding Period
        </Typography>
      </Grid>
      <Grid item>
        <ReturnsVSHoldingPeriodChart artistId={artistInfo.id} />
      </Grid>
      <Grid item>
        <Typography variant="h5" component="h2">
          Compound Annual Returns
        </Typography>
      </Grid>
      <Grid item>
        <CompoundAnnualReturns artistId={artistInfo.id} />
      </Grid>
    </Grid>
  )
}

export default ArtistAnalytics
