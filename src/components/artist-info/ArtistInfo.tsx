import React, { useState } from 'react'
import { Grid, Typography, Card, CardActionArea, CardMedia } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Artist } from '@interfaces/index'

const NO_IMAGE_URL = '/images/no-image-available.png'

const styles = () =>
  createStyles({
    cardRoot: {
      maxWidth: 250,
    },
  })

const useStyles = makeStyles(styles, { name: 'ArtistInfo' })

interface OwnProps {
  artist: Artist
}
type Props = OwnProps

const ArtistInfo: React.FC<Props> = ({ artist }) => {
  const classes = useStyles()
  const [toggler, setToggler] = useState(false)

  return (
    <Grid container direction="row" spacing={4} style={{ paddingBottom: 60 }}>
      <Grid item>
        <Card className={classes.cardRoot}>
          <CardActionArea onClick={() => setToggler(!toggler)}>
            <CardMedia
              image={artist.photoPresignedUrl || NO_IMAGE_URL}
              title={artist.name}
              component="img"
            />
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item>
        <Grid container spacing={1} direction="column">
          <Grid item>
            <Typography variant="h5" component="h2">
              {artist.name}
            </Typography>
          </Grid>
          {!!artist.bio && (
            <Grid item style={{ marginBottom: 10, marginTop: 10, fontSize: 14 }}>
              {artist.bio}
            </Grid>
          )}
          <Grid item direction="column" spacing={1} style={{ marginBottom: 10 }}>
            {artist.lotsCount} lots, {artist.artworksCount} artworks
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ArtistInfo
