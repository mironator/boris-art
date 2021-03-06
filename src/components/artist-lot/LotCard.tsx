import React, { useState } from 'react'
import FsLightbox from 'fslightbox-react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import { Artwork } from '@interfaces/index'
import { priceFormatter } from '@utils/formatters'

const useStyles = makeStyles({
  root: {
    maxWidth: 280,
    width: '100%',
  },
  media: {
    height: 280,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
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
    placeLastSold,
    dateLastSold,
    lastSoldAuctionHouseName,
  },
}) => {
  const classes = useStyles()
  const [toggler, setToggler] = useState(false)

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea onClick={() => setToggler(!toggler)}>
        <CardMedia
          className={classes.media}
          image={lotImagePresignedUrl}
          title={name}
          component="img"
        />
        <CardContent>
          <Typography gutterBottom variant="body1">
            {`${name}, ${creationYear}`}
          </Typography>
          <Typography variant="body1">Last recorded sale:</Typography>
          <Typography variant="body1">
            {`${priceFormatter(
              lastPrice
            )} at ${lastSoldAuctionHouseName}, ${placeLastSold} (${new Date(
              dateLastSold
            ).getFullYear()})`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
        <Link
          href={`/artworks/${id}`}
          target="_blank"
          rel="noopener"
          style={{ padding: 10, fontSize: 14 }}
          title={name}
        >
          Learn More
        </Link>
      </CardActions>
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
                )} at ${lastSoldAuctionHouseName}, ${placeLastSold} (${new Date(
                  dateLastSold
                ).getFullYear()})`}
              </Typography>
            </Grid>
          </div>,
        ]}
      />
    </Card>
  )
}

export default LotCard
