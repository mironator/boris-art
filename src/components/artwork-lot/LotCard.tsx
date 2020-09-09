import _ from 'lodash'
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
        {_.without(Object.keys(lot), '__typename').map((key: string) => (
          <Typography variant="body1" key={lot.lotNum}>
            <strong>{_.words(_.upperFirst(key)).join(' ')}: </strong>
            {lot[key as keyof Lot]}
          </Typography>
        ))}
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
