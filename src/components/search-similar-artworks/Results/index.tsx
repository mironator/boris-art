import _ from 'lodash'
import React, { useState } from 'react'
import { CircularProgress, Grid, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ResultBox from '@components/svg-icons/ResultBox'
import SimilarArtworks from './SimilarArtworks'

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

  icon: {
    fill: '#B8B8B8',
  },
}))

const EmptyState: React.FC = () => {
  const classes = useStyles()

  return (
    <>
      <ResultBox className={classes.icon} />
      <Typography variant="subtitle1" component="span" className={classes.title1}>
        Your results will be here
      </Typography>
      <Typography variant="subtitle2" component="span" className={classes.title2}>
        Please choose search options
      </Typography>
    </>
  )
}

type Props = {
  values: {
    artist: number
    image: string
    medium: string
    year: number
    height: number
    width: number
    depth: number
    unit: string
  }
}

// @ts-ignore
const Results: React.FC<Props> = ({ values }) => {
  const classes = useStyles()
  const [isLoading] = useState<boolean>(false)

  if (_.isEmpty(values)) {
    return (
      <Container maxWidth="md" className={classes.root}>
        <EmptyState />
      </Container>
    )
  }

  if (isLoading) {
    return (
      <Grid item style={{ textAlign: 'center' }}>
        <CircularProgress />
      </Grid>
    )
  }

  if (!_.isEmpty(values)) {
    // @ts-ignore
    return <SimilarArtworks values={values} />
  }
}

export default Results
