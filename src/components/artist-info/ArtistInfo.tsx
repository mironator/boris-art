import React, { useState } from 'react'
import { Divider, Grid, Typography, Card, CardActionArea, CardMedia, Box } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Artist } from '@interfaces/index'

const NO_IMAGE_URL = '/images/no-image-available.png'

const styles = () =>
  createStyles({
    cardRoot: {
      maxWidth: 350,
    },
    media: {
      // height: 280,
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
    <Grid container direction="column" style={{ marginBottom: 20 }}>
      <Box display="flex" justifyContent="center" p={3}>
        <Card className={classes.cardRoot}>
          <CardActionArea onClick={() => setToggler(!toggler)}>
            <CardMedia
              className={classes.media}
              image={artist.photoPresignedUrl || NO_IMAGE_URL}
              title={artist.name}
              component="img"
            />
          </CardActionArea>
        </Card>
      </Box>
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
