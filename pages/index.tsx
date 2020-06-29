import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

// import ProTip from '../src/ProTip';
import Link from '@components/Link'
import Copyright from '@components/Copyright'

const Index: React.FC<unknown> = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Boris Art
        </Typography>

        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <Copyright />
      </Box>
    </Container>
  )
}

export default Index
