import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

const Layout: React.FC<unknown> = ({ children }) => (
  <>
    <CssBaseline />
    <Container maxWidth="md">{children || []}</Container>
  </>
)

export default Layout
