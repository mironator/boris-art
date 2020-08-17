import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
  },

  title1: {
    color: 'rgb(184, 184, 184)',
    fontSize: '32px',
    fontFamily: 'Lato-Regular',
  },

  title2: {
    color: 'rgb(184, 184, 184)',
    fontFamily: 'Lato-Regular',
    fontSize: '18px',
  },
}))

const Results: React.FC<unknown> = () => {
  const classes = useStyles()

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="subtitle1" component="span" className={classes.title1}>
        Your results will be here
      </Typography>
      <Typography variant="subtitle2" component="span" className={classes.title2}>
        Please choise search options
      </Typography>
    </Container>
  )
}

export default Results
