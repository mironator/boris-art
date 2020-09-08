import React from 'react'
import { Grid, Tab, Tabs, Typography } from '@material-ui/core'
import classNames from 'classnames'

import { Artist } from '@interfaces/index'

// import ArtworkIndexChart from './charts/ArtworkIndexChart'
import ArtworkIndexAllCharts from './charts/ArtworkIndexAllCharts'
import ArtworkIndexCompareChart from './charts/ArtworkIndexCompareChart'
import ReturnsVSHoldingPeriodChart from './charts/ReturnsVSHoldingPeriodChart'
import CompoundAnnualReturns from './charts/CompoundAnnualReturns'
import useStyles from './ArtistAnalytics.styles'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

interface OwnProps {
  artist: Artist
}

type Props = OwnProps

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  const classes = useStyles()

  return (
    <Grid
      item
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={classNames({
        [classes.hidden]: value !== index,
      })}
      {...other}
    >
      {children}
    </Grid>
  )
}

const ArtistAnalytics: React.FC<Props> = ({ artist }) => {
  const [barValue, setBarValue] = React.useState(0)

  const handleBarChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setBarValue(newValue)
  }

  if (!artist.id) {
    return null
  }

  return (
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <Tabs value={barValue} onChange={handleBarChange} aria-label="Artist analytics">
          <Tab label="Artwork Index" />
          <Tab label="Artist Comparison" />
        </Tabs>
      </Grid>
      <TabPanel value={barValue} index={0}>
        <ArtworkIndexAllCharts artist={artist} />
      </TabPanel>
      <TabPanel value={barValue} index={1}>
        <ArtworkIndexCompareChart artist={artist} />
      </TabPanel>
      <Grid item>
        <Typography variant="h5" component="h2">
          Annual Returns vs Holding Period
        </Typography>
      </Grid>
      <Grid item>
        <ReturnsVSHoldingPeriodChart artistId={artist.id} />
      </Grid>
      <Grid item>
        <Typography variant="h5" component="h2">
          Compound Annual Returns
        </Typography>
      </Grid>
      <Grid item>
        <CompoundAnnualReturns artistId={artist.id} />
      </Grid>
    </Grid>
  )
}

export default ArtistAnalytics
