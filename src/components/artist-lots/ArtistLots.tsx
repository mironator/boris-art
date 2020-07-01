import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Container } from 'next/app'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import Lot from '@components/artist-lot'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
)

const ArtistLots: React.FC<unknown> = () => {
  const classes = useStyles()

  function FormRow() {
    return (
      <>
        <Grid item xs={4}>
          <Lot />
        </Grid>
        <Grid item xs={4}>
          <Lot />
        </Grid>
        <Grid item xs={4}>
          <Lot />
        </Grid>
      </>
    )
  }

  return (
    <Container>
      <Typography variant="h5" component="h2">
        Lots
      </Typography>
      <div className={classes.root}>
        <Grid container spacing={5}>
          <Grid container item xs={12} spacing={5}>
            <FormRow />
          </Grid>
          <Grid container item xs={12} spacing={5}>
            <FormRow />
          </Grid>
          <Grid container item xs={12} spacing={5}>
            <FormRow />
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default ArtistLots
