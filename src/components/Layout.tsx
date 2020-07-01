import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

interface Props {
  children: JSX.Element[] | JSX.Element
}

const Layout: React.FC<Props> = ({ children }) => (
  <>
    <CssBaseline />
    <Container maxWidth="sm">{children}</Container>
  </>
)

export default Layout
