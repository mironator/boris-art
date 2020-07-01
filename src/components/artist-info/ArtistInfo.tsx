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
        ({artist.birth}-{artist.death})
      </Grid>
      <Grid item>145 lots</Grid>
      <Divider />
      <Grid item>
        Pablo Ruiz Picasso was a Spanish painter, sculptor, printmaker, ceramicist and theatre
        designer who spent most of his adult life in France. Regarded as one of the most influential
        artists of the 20th century, he is known for co-founding the Cubist movement, the invention
        of constructed sculpture, the co-invention of collage, and for the wide variety of styles
        that he helped develop and explore. Among his most famous works are the proto-Cubist
        Demoiselles d&apos;Avignon (1907), and Guernica (1937), a dramatic portrayal of the bombing
        of of Guernica by German and Italian airforces during the Spanish Civil War.
      </Grid>
    </Grid>
  )
}

export default ArtistInfo
