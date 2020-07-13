import React from 'react'
import { Grid, Typography } from '@material-ui/core'

import { Artist } from '@interfaces/index'
import PriceMomentumAndVolumeChart from './charts/PriceMomentumAndVolumeChart'
import ArtworkIndexChart from './charts/ArtworkIndexChart'

interface OwnProps {
  artistInfo: Artist
}

type Props = OwnProps

const ArtistAnalytics: React.FC<Props> = ({ artistInfo }) => {
  return (
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <Typography variant="h5" component="h2">
          Chart for artworks over the years
        </Typography>
      </Grid>
      <Grid item>
        <PriceMomentumAndVolumeChart artistId={artistInfo.id} />
      </Grid>
      <Grid item>
        <Typography variant="h5" component="h2">
          Artwork Index Chart
        </Typography>
      </Grid>
      <Grid item>
        <ArtworkIndexChart artistId={artistInfo.id} />
      </Grid>
    </Grid>
  )
}

export default ArtistAnalytics
