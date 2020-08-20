import React, { useState, useCallback } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Form, Field } from 'react-final-form'
import { TextField, Select, Autocomplete } from 'mui-rff'
import { useDebounce } from 'use-debounce'
import { gql, useQuery } from '@apollo/client'
import { Artist } from '@interfaces/index'

import DropZone from './DropZone'

// import UploadCloud from '@icons/UploadCloud'

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'Georgia',
    marginBottom: theme.spacing(3),
  },

  dropZone: {
    height: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    border: '2px dashed',
    borderColor: 'rgb(184, 184, 184)',
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

// const onSubmit = async (values: any) => {
//   await sleep(300)
//   window.alert(JSON.stringify(values, 0, 2))
// }

type Props = {
  onSubmit: (values: unknown) => void
  onReset: () => void
}

const GET_ARTISTS = gql`
  query GetArtists($query: String!) {
    artists(query: $query) {
      id
      name
      birth
      death
      artworksCount
      qualifier
      lotsCost
    }
  }
`

type VariablesType = {
  query: string
}

type ArtistsData = {
  artists: Artist[]
}

const Search: React.FC<Props> = ({ onSubmit, onReset }) => {
  const classes = useStyles()
  const [inputText, setInputText] = useState<string>('')
  const [debouncedInputText] = useDebounce(inputText, 300)

  const { data: { artists = [] } = { artists: [] } } = useQuery<ArtistsData, VariablesType>(
    GET_ARTISTS,
    {
      variables: { query: debouncedInputText },
    }
  )

  const onInputChange = useCallback((_event, value) => {
    // console.log('[INFO] onInputChange', event, value, reason)
    setInputText(value)
  }, [])

  return (
    <Form
      onSubmit={onSubmit}
      // validate={validate}
      render={({ handleSubmit, form, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <Container>
            <Typography variant="h4" className={classes.title}>
              Search Similar Artworks
            </Typography>

            <Field name="image">
              {(props) => (
                <DropZone
                  fieldName="image"
                  className={classes.dropZone}
                  value={props.input.value}
                />
              )}
            </Field>

            <Grid container spacing={2}>
              <Grid container item>
                <Grid item xs={12}>
                  <TextField label="Title" placeholder="Search by title" fullWidth name="title" />
                </Grid>
              </Grid>

              <Grid container item>
                <Grid item xs={12}>
                  <Autocomplete
                    label="Artist"
                    options={artists}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.name}
                    onInputChange={onInputChange}
                    placeholder="Search by artist"
                    fullWidth
                    name="artist"
                  />
                </Grid>
              </Grid>

              <Grid container item spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Creation year"
                    placeholder="Date"
                    fullWidth
                    type="number"
                    name="year"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Select label="Medium" fullWidth name="medium">
                    <option value="all">All</option>
                    <option value="paintings">Paintings</option>
                    <option value="prints">Prints</option>
                    <option value="undetermined">Undetermined</option>
                    <option value="photographs">Photographs</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="sculpture">Sculpture</option>
                    <option value="furniture">Furniture</option>
                    <option value="ceramics">Ceramics</option>
                    <option value="other">Other</option>
                    <option value="worksOnPaper">WorksOnPaper</option>
                  </Select>
                </Grid>
              </Grid>

              <Grid container item>
                <Grid item xs={6} className={classes.singleSpacing}>
                  <Select label="Size units" fullWidth name="unit">
                    <option value="in">in</option>
                    <option value="cm">cm</option>
                  </Select>
                </Grid>
              </Grid>

              <Grid container item spacing={2}>
                <Grid item xs={4}>
                  <TextField label="Height" placeholder="Height" type="number" name="height" />
                </Grid>
                <Grid item xs={4}>
                  <TextField label="Weight" placeholder="Weight" type="number" name="width" />
                </Grid>
                <Grid item xs={4}>
                  <TextField label="Depth" placeholder="Depth" type="number" name="depth" />
                </Grid>
              </Grid>

              <Grid container item>
                <Grid item xs={6} className={classes.singleSpacing}>
                  <TextField
                    label="Minimum similarity"
                    fullWidth
                    type="number"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    name="similarity"
                  />
                </Grid>
              </Grid>
            </Grid>

            <div>
              <Button variant="contained" color="primary" className={classes.button} type="submit">
                Search
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  form.reset()
                  onReset()
                }}
                disabled={submitting || pristine}
              >
                Reset Search
              </Button>
            </div>
          </Container>
        </form>
      )}
    />
  )
}

export default Search
