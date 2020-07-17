import React, { useCallback } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Typography from '@material-ui/core/Typography'

import Header from '@components/layout/header'
import useStyles from './styles'

type Props = {
  onInputChange: (...args: any[]) => void
}

const HeaderWithSearch: React.FC<Props> = ({ onInputChange }) => {
  const classes = useStyles({})

  const onInput = useCallback((e) => {
    console.log('[INFO] onInput', e.target.value)
    onInputChange(e.target.value)
  }, [])

  return (
    <Header>
      <Typography className={classes.title} variant="h6" noWrap>
        Search for Artworks
      </Typography>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={onInput}
        />
      </div>
    </Header>
  )
}

export default HeaderWithSearch
