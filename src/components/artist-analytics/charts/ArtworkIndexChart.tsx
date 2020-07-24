import React, { useState, useCallback } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CircularProgress, Grid, MenuItem, Select, Typography } from '@material-ui/core'

import { useArtworkIndexChartData } from '@hooks/useChartData'
import mediumList from '@hooks/mediumList'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '456px',
    },
    sortLabel: {
      marginRight: '7px',
    },
  })
)

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

type Props = {
  artistId: number
}

const ArtworkIndexChart: React.FC<Props> = ({ artistId }) => {
  const classes = useStyles()
  const [medium, setMedium] = useState<keyof typeof mediumList>(mediumList.all)
  const { data, isLoading, isError } = useArtworkIndexChartData(artistId, medium)

  const lineData = []
  const volume = []
  const dataLength = data.length
  let i = 0

  const updateMedium = useCallback((event: any) => {
    setMedium(event.target.value)
  }, [])

  for (i; i < dataLength; i += 1) {
    lineData.push([data[i].date.getTime(), data[i].index])
    volume.push([
      data[i].date.getTime(), // the date
      data[i].volume, // the volume
    ])
  }

  let options: Highcharts.Options | null = null

  if (data && !isLoading && !isError) {
    options = {
      rangeSelector: {
        allButtonsEnabled: true,
        selected: 6,
      },

      title: {
        text: '',
      },

      yAxis: [
        {
          labels: {
            align: 'left',
          },
          height: '80%',
          resize: {
            enabled: true,
          },
        },
        {
          labels: {
            align: 'left',
          },
          top: '80%',
          height: '20%',
          offset: 0,
        },
      ],

      series: [
        {
          type: 'line',
          name: 'Artwork Index',
          data: lineData,
          tooltip: {
            valueDecimals: 2,
          },
        },
        {
          type: 'column',
          name: 'Artwork Volume',
          data: volume,
          yAxis: 1,
        },
      ],
    }
  }

  if (!options || isLoading || !lineData.length) {
    return (
      <Grid container justify="center" alignItems="center" className={classes.root}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  }

  return (
    <div className={classes.root}>
      <Grid container direction="row" alignItems="center">
        <Typography className={classes.sortLabel}>Medium:</Typography>
        <Select value={medium} onChange={updateMedium}>
          <MenuItem value={mediumList.all}>All</MenuItem>
          <MenuItem value={mediumList.paintings}>Paintings</MenuItem>
          <MenuItem value={mediumList.prints}>Prints</MenuItem>
          <MenuItem value={mediumList.undetermined}>Undetermined</MenuItem>
          <MenuItem value={mediumList.photographs}>Photographs</MenuItem>
          <MenuItem value={mediumList.jewelry}>Jewelry</MenuItem>
          <MenuItem value={mediumList.sculpture}>Sculpture</MenuItem>
          <MenuItem value={mediumList.furniture}>Furniture</MenuItem>
          <MenuItem value={mediumList.ceramics}>Ceramics</MenuItem>
          <MenuItem value={mediumList.other}>Other</MenuItem>
          <MenuItem value={mediumList.worksOnPaper}>Works on paper</MenuItem>
        </Select>
      </Grid>

      <HighchartsReact highcharts={Highcharts} options={options} constructorType="stockChart" />
    </div>
  )
}

export default ArtworkIndexChart
