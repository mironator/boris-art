import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Header from './header'

const Layout: React.FC<unknown> = ({ children }) => (
  <>
    <CssBaseline />
    <Header />
    <Container maxWidth="md" style={{ marginTop: 20 }}>
      {children || []}
    </Container>
  </>
)

export default Layout
