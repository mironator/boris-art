import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CircularProgress, Grid } from '@material-ui/core'

import { useArtworkIndexChartAllData } from '@hooks/useChartData'
import mediumTypes from '@hooks/mediumTypes'

const useStyles = makeStyles(() =>
  createStyles({
    loading: {
      height: '400px',
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
  const { data, isLoading, isError } = useArtworkIndexChartAllData(artistId)

  const seriesLine = data.map(({ name, data: items }) => ({
    type: 'line',
    name: `Artwork ${name} index`,
    data: items.map((item) => [item.date.getTime(), item.index]),
    tooltip: {
      valueDecimals: 2,
    },
  }))

  const columnLine = data
    .filter(({ name }) => name === mediumTypes.all)
    .map(({ name, data: items }) => ({
      type: 'column',
      name: `Artwork ${name} volume`,
      data: items.map((item) => [item.date.getTime(), item.volume]),
      yAxis: 1,
    }))

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

      series: [...seriesLine, ...columnLine] as Highcharts.SeriesOptionsType[],
    }
  }

  return (
    <>
      {isLoading ? (
        <Grid container justify="center" alignItems="center" className={classes.loading}>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={options} constructorType="stockChart" />
      )}
    </>
  )
}

export default ArtworkIndexChart
