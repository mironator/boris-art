import React from 'react'
import { Divider, Grid, Typography } from '@material-ui/core'
import { Artist } from '@interfaces/index'

interface OwnProps {
  artist: Artist
}
type Props = OwnProps

const ArtistInfo: React.FC<Props> = ({ artist }) => {
  return (
    <Grid container direction="column" style={{ marginBottom: 20 }}>
      <Grid item>
        <Typography variant="h5" component="h2">
          {artist.name}
        </Typography>
      </Grid>
      <Grid item style={{ marginBottom: 20 }}>
        ({artist.birth?.getFullYear()}-{artist.death?.getFullYear()})
      </Grid>
      {!!artist.bio && (
        <Grid item style={{ marginBottom: 20, fontSize: '80%' }}>
          {artist.bio}
        </Grid>
      )}
      <Grid item container direction="column" spacing={1} style={{ marginBottom: 10 }}>
        <Grid item>{artist.lotsCount} lots</Grid>
        <Grid item>{artist.artworksCount} artworks</Grid>
      </Grid>
      <Divider />
    </Grid>
  )
}

export default ArtistInfo
