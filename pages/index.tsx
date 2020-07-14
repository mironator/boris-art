import React, { useCallback, useState, useEffect } from 'react'
// import fetch from 'cross-fetch'
import { useRouter } from 'next/router'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useDebounce } from 'use-debounce'

import Layout from '@components/layout/Layout'
import { Artist as IArtist, ArtistEntity } from '@interfaces/index'

import Artist from '@models/Artist'

const useStyles = makeStyles({
  root: {
    width: '100%',
    borderRadius: 0,
    border: '1px solid rgb(0, 0, 0)',
    '& *': {
      border: 0,
      outline: 0,
    },
  },
  inputRoot: {
    padding: '6px !important',
  },
  paper: {
    borderRadius: 0,
    boxShadow: '0px 8px 12px 0px rgba(0, 0, 0, 0.05)',
    color: 'rgb(184, 184, 184)',
  },
  input: {
    '&::placeholder': {
      color: 'rgb(184, 184, 184)',
    },
  },
})

const Search: React.FC<unknown> = () => {
  const classes = useStyles()
  const router = useRouter()
  const [inputText, setInputText] = useState<string>('')
  const [debouncedInputText] = useDebounce(inputText, 300)

  const [options, setOptions] = useState<IArtist[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const onArtistSelected = useCallback(
    (_, value, reason) => {
      if (reason === 'select-option') router.push(`/artists/${value.id}`)
    },
    [router]
  )

  const onInputChange = useCallback((_, value, reason) => {
    if (reason === 'input') {
      // if (value.length > 2) {
      setInputText(value)
      // }
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line
    ; (async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/artists?query=${debouncedInputText}`)
        const artists = await response.json()

        setOptions(artists.map((entity: ArtistEntity) => Artist.fromEntity(entity)))
      } finally {
        setLoading(false)
      }
    })()
  }, [debouncedInputText])

  return (
    <Layout>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Autocomplete
          id="autocomplete"
          classes={{
            root: classes.root,
            inputRoot: classes.inputRoot,
            paper: classes.paper,
          }}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          options={options}
          loading={loading}
          onChange={onArtistSelected}
          onInputChange={onInputChange}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              placeholder="Search"
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                endadornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Grid>
    </Layout>
  )
}

export default Search
