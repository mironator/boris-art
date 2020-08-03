import React, { useState } from 'react'
import { Box, Card, CardActionArea, CardMedia, Grid, Typography } from '@material-ui/core'
import FsLightbox from 'fslightbox-react'
import moment from 'moment'

import { Artwork } from '@interfaces/index'
import { priceFormatter } from '@utils/formatters'

import useStyles from './ArtworkDetails.styles'

interface OwnProps {
  artwork: Artwork
}

type Props = OwnProps

const ArtworkDetails: React.FC<Props> = ({ artwork }) => {
  const classes = useStyles()
  const [toggler, setToggler] = useState(false)

  return (
    <>
      <Box display="flex" justifyContent="center" p={3}>
        <Card className={classes.cardRoot} variant="outlined">
          <CardActionArea onClick={() => setToggler(!toggler)}>
            <CardMedia
              className={classes.media}
              image={artwork.lotImagePresignedUrl}
              title={artwork.name}
              component="img"
            />
          </CardActionArea>
        </Card>
      </Box>
      <Box justifyContent="left">
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justify="flex-start"
          className={classes.imageDescription}
          xs={12}
          spacing={2}
        >
          <Grid item>
            <Typography gutterBottom variant="body1" component="h4" className={classes.artworkName}>
              {artwork.name} ({artwork.creationYear})
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" component="p">
              <strong>Artist ID:</strong> {artwork.artistId}
            </Typography>
          </Grid>
          <Grid item container direction="row" className={classes.briefInfo}>
            <Grid item container direction="column" sm={6}>
              <Grid item>
                <strong>Price:</strong>
                {artwork.lastPrice && ` ${priceFormatter(artwork.lastPrice)}`}
              </Grid>
            </Grid>
            <Grid item container direction="column" sm={6}>
              <Grid item>
                <strong>Date Last sold:</strong>
                {artwork.dateLastSold && ` ${moment(artwork.dateLastSold).format('LL')}`}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body2" component="div">
              <strong>Description:</strong> {artwork.description}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" component="p">
              <strong>Materials:</strong> {artwork.materials}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <FsLightbox
        toggler={toggler}
        customSources={[
          <div className={classes.imageContainer} key={artwork.id}>
            <img className={classes.image} src={artwork.lotImagePresignedUrl} alt="Snow" />
            <Grid
              container
              direction="column"
              alignItems="flex-end"
              justify="flex-end"
              className={classes.imageContent}
            >
              <Typography gutterBottom variant="body1" component="h4">
                {artwork.name}
              </Typography>
              <Typography variant="body2" component="p">
                {artwork.markings}
              </Typography>
              <Typography variant="body2" component="p">
                {artwork.creationYear}
              </Typography>
              <Typography variant="body1" component="h4">
                {artwork.lastPrice && `Price: ${priceFormatter(artwork.lastPrice)}`}
              </Typography>
            </Grid>
          </div>,
        ]}
      />
      {/* <pre>{JSON.stringify(artwork, undefined, 2)}</pre> */}
    </>
  )
}

export default ArtworkDetails
