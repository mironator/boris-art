import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import DropZone from './DropZone'

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'Georgia',
    marginBottom: theme.spacing(3),
  },

  dropZone: {
    height: 250,
  },

  singleSpacing: {
    paddingRight: theme.spacing(1),
  },

  button: {
    minWidth: '43%', // equal 182px in design
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(2),
  },
}))

export type SearchProps = {
  image: string
}

export type SearchComponentProps = {
  onReset: () => void
  onSearch: (_: SearchProps) => void
}

const Search: React.FC<SearchComponentProps> = (props) => {
  const { onSearch, onReset } = props

  const classes = useStyles()

  const [image, setImage] = useState<string | undefined>()

  const resetAll = () => {
    setImage(undefined)
    onReset()
  }

  const handleSearch = () => onSearch({ image: image as string })

  return (
    <Container>
      <Typography variant="h4" className={classes.title}>
        Search Similar Artworks
      </Typography>

      <DropZone className={classes.dropZone} image={image} onImageChanged={setImage} />

      <Grid container spacing={2}>
        <Grid container item>
          <Grid item xs={12}>
            <TextField label="Title" placeholder="Search by title" fullWidth />
          </Grid>
        </Grid>

        <Grid container item>
          <Grid item xs={12}>
            <TextField label="Artist" placeholder="Search by artist" fullWidth />
          </Grid>
        </Grid>

        <Grid container item spacing={2}>
          <Grid item xs={6}>
            <TextField label="Creation year" placeholder="Date" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Medium" fullWidth />
          </Grid>
        </Grid>

        <Grid container item>
          <Grid item xs={6} className={classes.singleSpacing}>
            <TextField label="Size units" fullWidth />
          </Grid>
        </Grid>

        <Grid container item spacing={2}>
          <Grid item xs={4}>
            <TextField label="Height" placeholder="Height" />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Weight" placeholder="Weight" />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Depth" placeholder="Depth" />
          </Grid>
        </Grid>

        <Grid container item>
          <Grid item xs={6} className={classes.singleSpacing}>
            <TextField
              label="Minimum similarity"
              defaultValue={50}
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={!image}
          onClick={handleSearch}
        >
          Search
        </Button>
        {image && (
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={resetAll}
          >
            Reset Search
          </Button>
        )}
      </div>
    </Container>
  )
}

export default Search
