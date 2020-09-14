import _ from 'lodash'
import moment from 'moment'
import React, { useState } from 'react'
import FsLightbox from 'fslightbox-react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import { Lot } from '@interfaces/index'

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
    wordBreak: 'break-word',
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
  lot: Lot
}

type Props = OwnProps

const LotCard: React.FC<Props> = ({ lot }) => {
  const classes = useStyles()
  const [toggler, setToggler] = useState(false)

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea className={classes.actionArea} onClick={() => setToggler(!toggler)}>
        <CardMedia className={classes.media} image={lot.lotImagePresignedUrl} component="img" />
      </CardActionArea>

      <CardContent className={classes.content}>
        {!!lot.artworkName && (
          <Typography variant="body1">
            <strong>Title:</strong> {lot.artworkName}
          </Typography>
        )}
        {!!lot.artwork.creationYear && (
          <Typography variant="body1">
            <strong>Year:</strong> {lot.artwork.creationYear}
          </Typography>
        )}
        {!!lot.artistName && (
          <Typography variant="body1">
            <strong>Artist Name:</strong> {lot.artistName}
          </Typography>
        )}
        {!!lot.lotImageSize && (
          <Typography variant="body1">
            <strong>Dimensions: </strong> {lot.lotImageSize}
          </Typography>
        )}
        {!!lot.mediumFinal && (
          <Typography variant="body1">
            <strong>Medium:</strong> {lot.mediumFinal}
          </Typography>
        )}
        <br />
        {!!lot.priceSold && (
          <Typography variant="body1">
            <strong>Price Sold: </strong>USD {lot.priceUsdZeroied}{' '}
            {lot.currency !== 'USD' ? `(${lot.currency} ${lot.priceSold})` : ''}
            {/* USD 700, 000(if sold in currency other than USD, give Price Sold in the
        original currency in parentheses) */}
          </Typography>
        )}
        {!!lot.priceEstimateMin && (
          <Typography variant="body1">
            <strong>Estimate: </strong>USD {lot.priceEstimateMinUsdZeroied} &mdash;{' '}
            {lot.priceEstimateMaxUsdZeroied}{' '}
            {lot.currency !== 'USD'
              ? `(${lot.currency} ${lot.priceEstimateMin} — ${lot.priceEstimateMax})`
              : ''}
            {/* Estimate: USD 600, 000 - 800, 000(if the Estimate was
        in currency other than USD, give Estimate in the original currency in parentheses) */}
          </Typography>
        )}
        {!!lot.boughtIn && (
          <Typography variant="body1">
            <strong>Bought In: </strong> {lot.boughtIn ? 'Yes' : 'No'}
          </Typography>
        )}
        {!!lot.auctionStartDate && (
          <Typography variant="body1">
            <strong>Auction Date:</strong> {moment(lot.auctionStartDate).format('LL')}
          </Typography>
        )}
        {!!lot.auctionHouseName && (
          <Typography variant="body1">
            <strong>Auction House: </strong> {lot.auctionHouseName}
          </Typography>
        )}
        {!!lot.auctionName && (
          <Typography variant="body1">
            <strong>Auction Name: </strong> {lot.auctionName}
          </Typography>
        )}
        {!!lot.auctionLocation && (
          <Typography variant="body1">
            <strong>Auction Location: </strong> {lot.auctionLocation}
          </Typography>
        )}
        {!!lot.lotNum && (
          <Typography variant="body1">
            <strong>Lot: </strong> {lot.lotNum}
          </Typography>
        )}
        {!!lot.isMultipleObjects && (
          <Typography variant="body1">
            <strong>Is Multiple Objects: </strong> {lot.isMultipleObjects ? 'Yes' : 'No'}
          </Typography>
        )}
        <br />
        {!!lot.catalogNotes && (
          <Typography variant="body1">
            <strong>Catalog Notes: </strong> {lot.catalogNotes}
          </Typography>
        )}
      </CardContent>

      <FsLightbox
        toggler={toggler}
        customSources={[
          <div className={classes.imageContainer} key={lot.lotNum}>
            <img className={classes.image} src={lot.lotImagePresignedUrl} alt="Snow" />
          </div>,
        ]}
      />
    </Card>
  )
}

export default LotCard
