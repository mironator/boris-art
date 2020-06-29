import React from 'react'
import { Typography, Link as MuiLink } from '@material-ui/core'

const Copyright: React.FC<unknown> = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://material-ui.com/">
        Boris Art
      </MuiLink>{' '}
      {new Date().getFullYear()}.
    </Typography>
  )
}

export default Copyright
