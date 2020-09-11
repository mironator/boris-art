import React from 'react'
import { Box, Tab, Tabs, Typography } from '@material-ui/core'

import { Artist } from '@interfaces/index'
// import useStyles, { StyleProps } from './ArtistDetails.styles'
import ArtistInfo from '../artist-info'
import ArtistLots from '../artist-lots'
import ArtistAnalytics from '../artist-analytics'
import useStyles from './ArtistDetails.styles'

interface OwnProps {
  artist: Artist
}

interface TabPanelProps {
  children?: React.ReactNode
  index: unknown
  value: unknown
}

// type PropsClasses = Record<StyleProps, string>

type Props = OwnProps

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  const classes = useStyles({})

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ padding: 0 }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {value === index && (
        <Box p={3} className={classes.tabPanel}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const ArtistDetails: React.FC<Props> = (props) => {
  // const classes: PropsClasses = useStyles({})
  const [value, setValue] = React.useState(0)

  const handleChange = (_event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue)
  }

  const { artist } = props

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Artist Tabs"
        style={{ marginTop: 10 }}
      >
        <Tab label="Info" />
        <Tab label="Analytics" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ArtistInfo artist={artist} />
        <ArtistLots artist={artist} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ArtistInfo artist={artist} />
        <ArtistAnalytics artist={artist} />
      </TabPanel>
    </>
  )
}

export default ArtistDetails
