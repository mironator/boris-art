import _ from 'lodash'
import React, { useState } from 'react'
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@material-ui/core'
import FsLightbox from 'fslightbox-react'

import { Artwork } from '@interfaces/index'
import { priceFormatter } from '@utils/formatters'

import useStyles from './ArtworkDetails.styles'

interface OwnProps {
  artwork: Artwork
}

const NO_IMAGE_URL = '/images/no-image-available.png'

type Props = OwnProps

const ArtworkDetails: React.FC<Props> = ({ artwork }) => {
  const classes = useStyles()
  const [toggler, setToggler] = useState(false)

  return (
    <>
      <Grid container direction="row" spacing={4} style={{ paddingBottom: 60, marginTop: 0 }}>
        <Grid item>
          <Card className={classes.cardRoot}>
            <CardActionArea onClick={() => setToggler(!toggler)}>
              <CardMedia
                image={artwork.lotImagePresignedUrl || NO_IMAGE_URL}
                title={artwork.name}
                component="img"
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item style={{ flex: 1 }}>
          <Grid container spacing={1} direction="column">
            <Grid item>
              <Typography variant="h5" component="h2">
                {artwork.name} {artwork.creationYear ? artwork.creationYear : ''}
              </Typography>
            </Grid>
            {!!_.get(artwork, 'artist.name') && (
              <Grid item style={{ marginBottom: 10, marginTop: 10, fontSize: 14 }}>
                <Typography variant="h6" component="h6">
                  {_.get(artwork, 'artist.name')}
                </Typography>
              </Grid>
            )}
            {!!artwork.lastPrice && (
              <Grid item style={{ marginBottom: 10, marginTop: 10, fontSize: 14 }}>
                <strong>Last recorded sale: </strong>
                {`${priceFormatter(artwork.lastPrice)} at ${artwork.lastSoldAuctionHouseName}, ${artwork.placeLastSold
                  } (${new Date(artwork.dateLastSold).getFullYear()})`}
              </Grid>
            )}
            {!!artwork.materials && (
              <Grid item>
                <Typography variant="body2" component="p">
                  <strong>Materials:</strong> {artwork.materials}
                </Typography>
              </Grid>
            )}
            {!!artwork.mediumFinal && (
              <Grid item>
                <Typography variant="body2" component="p">
                  <strong>Medium:</strong> {artwork.mediumFinal}
                </Typography>
              </Grid>
            )}
            {!!artwork.description && (
              <Grid item>
                <Typography variant="body2" component="p">
                  <strong>Description:</strong> {artwork.description}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

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
