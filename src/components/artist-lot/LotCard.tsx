import React, { useState } from 'react'
import FsLightbox from 'fslightbox-react'
import { makeStyles, withTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    maxWidth: 280,
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

const LotCard: React.FC<unknown> = () => {
  const classes = useStyles()
  const [toggler, setToggler] = useState(false)

  return (
    <Card className={classes.root} variant="outlined" onClick={() => setToggler(!toggler)}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://uploads6.wikiart.org/images/pablo-picasso/portrait-of-suzanne-bloch-1904.jpg"
          title="Portrait of Suzanne Bloch"
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="h4">
            Portrait of Suzanne Bloch, 1904
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Painting
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            $ 150,000
          </Typography>
        </CardContent>
      </CardActionArea>
      <FsLightbox
        toggler={toggler}
        customSources={[
          <div
            className={classes.imageContainer}
            key="https://uploads6.wikiart.org/images/pablo-picasso/portrait-of-suzanne-bloch-1904.jpg"
          >
            <img
              className={classes.image}
              src="https://uploads6.wikiart.org/images/pablo-picasso/portrait-of-suzanne-bloch-1904.jpg"
              alt="Snow"
            />
            <Grid
              container
              direction="column"
              alignItems="flex-end"
              justify="flex-end"
              className={classes.imageContent}
            >
              <Typography gutterBottom variant="body1" component="h4">
                Portrait of Suzanne Bloch, 1904
              </Typography>
              <Typography variant="body2" component="p">
                Painting
              </Typography>
              <Typography variant="body2" component="p">
                $ 150,000
              </Typography>
            </Grid>
          </div>,
        ]}
      />
    </Card>
  )
}

export default LotCard
