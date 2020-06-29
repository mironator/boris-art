import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Grid, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Layout from '@components/Layout'

const options: Array<Record<string, string>> = [
  {
    label: 'Option 1',
  },
  {
    label: 'Option 2',
  },
]
const useStyles = makeStyles(() => ({}))

const Index: React.FC<unknown> = () => {
  const classes = useStyles()

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
        <Grid item xs={3}>
          <Autocomplete
            id="autocomplete"
            // classes={{
            // }}
            getOptionLabel={(option) => option.label || option.value || ''}
            options={options}
            autoComplete
            // value={value}
            includeInputInList
            // onFocus={onFocus}
            // freeSolo
            // onChange={(e, va) => { }}
            // disableOpenOnFocus
            // popupIcon={<ChevronDown />}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                placeholder="Placeholder"
                // autoComplete="new-password"
                variant="outlined"
                inputProps={{
                  ...params.inputProps,
                  autocomplete: 'off',
                  form: {
                    autocomplete: 'off',
                  },
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Index
