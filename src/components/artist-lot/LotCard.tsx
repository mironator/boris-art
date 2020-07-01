import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
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
})

const LotCard: React.FC<unknown> = () => {
  const classes = useStyles()

  return (
    <Card className={classes.root} variant="outlined">
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
    </Card>
  )
}

export default LotCard
