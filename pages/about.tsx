import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import Link from '@components/Link'

const AboutPage: React.FC<unknown> = () => (
  <Container maxWidth="sm">
    <Box my={4}>
      <Typography>About this website</Typography>

      <Link href="/" color="secondary">
        Go to Home page
      </Link>
    </Box>
  </Container>
)

export default AboutPage
