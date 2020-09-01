import React from 'react'
import { AppBar, Grid, Tab, Tabs, Typography } from '@material-ui/core'
import classNames from 'classnames'

import { Artist } from '@interfaces/index'
import mediumTypes from '@hooks/mediumTypes'

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
  artistInfo: Artist
  mediumList: Array<keyof typeof mediumTypes>
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

const ArtistAnalytics: React.FC<Props> = ({ artistInfo, mediumList }) => {
  const [barValue, setBarValue] = React.useState(0)

  const handleBarChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setBarValue(newValue)
  }

  if (!artistInfo.id) {
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
        <ArtworkIndexAllCharts artistId={artistInfo.id} mediumList={mediumList} />
      </TabPanel>
      <TabPanel value={barValue} index={1}>
        <ArtworkIndexCompareChart artist={artistInfo} />
      </TabPanel>
      <Grid item>
        <Typography variant="h5" component="h2">
          Annual Returns vs Holding Period
        </Typography>
      </Grid>
      <Grid item>
        <ReturnsVSHoldingPeriodChart artistId={artistInfo.id} />
      </Grid>
      <Grid item>
        <Typography variant="h5" component="h2">
          Compound Annual Returns
        </Typography>
      </Grid>
      <Grid item>
        <CompoundAnnualReturns artistId={artistInfo.id} />
      </Grid>
    </Grid>
  )
}

export default ArtistAnalytics
