import React from 'react'
import { Divider, Grid, Typography } from '@material-ui/core'
import { Artist } from '@interfaces/index'

interface OwnProps {
  artist: Artist
}

type Props = OwnProps

const ArtistInfo: React.FC<Props> = ({ artist }) => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h5" component="h2">
          {artist.name}
        </Typography>
      </Grid>
      <Grid item>
        ({artist.birth?.getFullYear()}-{artist.death?.getFullYear()})
      </Grid>
      <Grid item>145 lots</Grid>
      <Divider />
      <Grid item>%Artist Info%</Grid>
    </Grid>
  )
}

export default ArtistInfo
