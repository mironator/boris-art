import React, { useState } from 'react'
import FsLightbox from 'fslightbox-react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import { Artwork } from '@interfaces/index'
import { priceFormatter } from '@utils/formatters'

const useStyles = makeStyles({
  root: {
    // maxWidth: 280,
    width: '100%',
    display: 'flex',
  },
  media: {
    objectFit: 'contain',
    alignSelf: 'flex-start',
    paddingTop: 20,
    paddingLeft: 20,
  },
  actionArea: {
    display: 'flex',
    width: 250,
    justifyContent: 'flex-start',
  },
  content: {
    flex: '1 0',
    height: '100%',
    alignSelf: 'baseline',
    display: 'flex',
    flexDirection: 'column',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    objectFit: 'contain',
  },
  imageContent: {
    position: 'absolute',
    padding: '10px 15px',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    color: 'white',
    backgroundColor: '#00000000',
    opacity: 0.2,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 1,
      backgroundColor: '#0000006a',
    },
  },
})

interface OwnProps {
  artwork: Artwork
}

type Props = OwnProps

const LotCard: React.FC<Props> = ({
  artwork: {
    id,
    name,
    lotImagePresignedUrl,
    creationYear,
    lastPrice,
    lotImageSize,
    similarity,
    placeLastSold,
    dateLastSold,
    lastSoldAuctionHouseName,
    materials,
    mediumFinal,
    measurementsDepth,
    measurementsHeight,
    measurementsUnit,
    measurementsWidth,
    lotImageHeight,
    lotImageWidth,
    description,
    markings,
    conditionIn,
    sizeNotes,
  },
}) => {
  const classes = useStyles()
  const [toggler, setToggler] = useState(false)

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea className={classes.actionArea} onClick={() => setToggler(!toggler)}>
        <CardMedia
          className={classes.media}
          image={lotImagePresignedUrl}
          title={name}
          component="img"
        />
      </CardActionArea>
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h6">
          {`${name}, ${creationYear}`}
        </Typography>
        <Typography variant="body1">
          <strong>Last recorded sale:</strong>
          {`${priceFormatter(
            lastPrice
          )} at ${lastSoldAuctionHouseName}, ${placeLastSold} (${dateLastSold.getFullYear()})`}
        </Typography>
        {!!similarity && (
          <Typography variant="body1">
            <strong>Similarity: </strong>
            {similarity}
          </Typography>
        )}
        {!!materials && (
          <Typography variant="body1">
            <strong>Materials: </strong>
            {materials}
          </Typography>
        )}
        {!!mediumFinal && (
          <Typography variant="body1">
            <strong>Medium Final: </strong>
            {mediumFinal}
          </Typography>
        )}
        {!!measurementsDepth && (
          <Typography variant="body1">
            <strong>Measurements Depth: </strong>
            {measurementsDepth}
          </Typography>
        )}
        {!!measurementsHeight && (
          <Typography variant="body1">
            <strong>Measurements Height: </strong>
            {measurementsHeight}
          </Typography>
        )}
        {!!measurementsUnit && (
          <Typography variant="body1">
            <strong>Measurements Unit:</strong> {measurementsUnit}
          </Typography>
        )}
        {!!measurementsWidth && (
          <Typography variant="body1">
            <strong>Measurements Width: </strong>
            {measurementsWidth}
          </Typography>
        )}
        {!!lotImageHeight && (
          <Typography variant="body1">
            <strong>Lot Image Height: </strong>
            {lotImageHeight}
          </Typography>
        )}
        {!!lotImageSize && (
          <Typography variant="body1">
            <strong>Lot Image Size: </strong>
            {lotImageSize}
          </Typography>
        )}
        {!!lotImageWidth && (
          <Typography variant="body1">
            <strong>Lot Image Width: </strong>
            {lotImageWidth}
          </Typography>
        )}
        {!!description && (
          <Typography variant="body1">
            <strong>Description: </strong>
            {description}
          </Typography>
        )}
        {!!markings && (
          <Typography variant="body1">
            <strong>Markings: </strong>
            {markings}
          </Typography>
        )}
        {!!conditionIn && (
          <Typography variant="body1">
            <strong>Condition In: </strong>
            {conditionIn}
          </Typography>
        )}
        {!!sizeNotes && (
          <Typography variant="body1">
            <strong>Size Notes: </strong>
            {sizeNotes}
          </Typography>
        )}
        <Link
          href={`/artworks/${id}`}
          target="_blank"
          rel="noopener"
          style={{ fontSize: 14, marginTop: 24 }}
          title={name}
        >
          Learn More
        </Link>
      </CardContent>

      <FsLightbox
        toggler={toggler}
        customSources={[
          <div className={classes.imageContainer} key={id}>
            <img className={classes.image} src={lotImagePresignedUrl} alt="Snow" />
            <Grid
              container
              direction="column"
              alignItems="flex-end"
              justify="flex-end"
              className={classes.imageContent}
            >
              <Typography gutterBottom variant="body1">
                {`${name}, ${creationYear}`}
              </Typography>
              <Typography variant="body1">Last recorded sale:</Typography>
              <Typography variant="body1">
                {`${priceFormatter(
                  lastPrice
                )} at ${lastSoldAuctionHouseName}, ${placeLastSold} (${dateLastSold.getFullYear()})`}
              </Typography>
            </Grid>
          </div>,
        ]}
      />
    </Card>
  )
}

export default LotCard
