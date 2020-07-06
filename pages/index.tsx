import React, { useCallback, useState, useEffect } from 'react'
// import fetch from 'cross-fetch'
import { useRouter } from 'next/router'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import Layout from '@components/Layout'
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
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<IArtist[]>([])
  const loading = open && options.length === 0

  const onArtistSelected = useCallback(
    (_, value, reason) => {
      if (reason === 'select-option') router.push(`/artists/${value.id}`)
    },
    [router]
  )

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    // eslint-disable-next-line
    ; (async () => {
      const response = await fetch('/api/artists')
      const artists = await response.json()

      if (active) {
        setOptions(artists.map((entity: ArtistEntity) => Artist.fromEntity(entity)))
      }
    })()

    return () => {
      active = false
    }
  }, [loading])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

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
          open={open}
          onOpen={() => {
            setOpen(true)
          }}
          onClose={() => {
            setOpen(false)
          }}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          options={options}
          loading={loading}
          onChange={onArtistSelected}
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
