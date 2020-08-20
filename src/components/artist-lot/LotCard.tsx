import React, { useState, useCallback } from 'react'
import Router from 'next/router'
import FsLightbox from 'fslightbox-react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
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
  artwork: { id, name, lotImagePresignedUrl, markings, creationYear, lastPrice, placeLastSold },
}) => {
  const classes = useStyles()
  const [toggler, setToggler] = useState(false)

  const goToDetails = useCallback(
    (artworkId: number) => () => {
      Router.push(`/artworks/${artworkId}`)
    },
    [id]
  )

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
          <Typography gutterBottom variant="body1" component="h4">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {markings}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {creationYear}
          </Typography>
          {lastPrice && (
            <Typography variant="body1" component="p">
              {`Price: ${priceFormatter(lastPrice)}`}
            </Typography>
          )}
          {placeLastSold && (
            <Typography variant="body1" component="p" style={{ bottom: 0 }}>
              {`Auction: ${placeLastSold}`}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
        <Button size="small" color="primary" onClick={goToDetails(id)}>
          Learn More
        </Button>
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
              <Typography gutterBottom variant="body1" component="h4">
                {name}
              </Typography>
              <Typography variant="body2" component="p">
                {markings}
              </Typography>
              <Typography variant="body2" component="p">
                {creationYear}
              </Typography>
              {lastPrice && (
                <Typography variant="body1" component="h4">
                  {`Price: ${priceFormatter(lastPrice)}`}
                </Typography>
              )}
              {placeLastSold && (
                <Typography variant="body1" component="h4">
                  {`Auction: ${placeLastSold}`}
                </Typography>
              )}
            </Grid>
          </div>,
        ]}
      />
    </Card>
  )
}

export default LotCard
