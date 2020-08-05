import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CircularProgress, Grid } from '@material-ui/core'

import { useArtworkIndexChartAllData } from '@hooks/useChartData'

const useStyles = makeStyles(() =>
  createStyles({
    loading: {
      height: '400px',
    },
  })
)

let colors: string[] = []

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
  colors = Highcharts.getOptions().colors || []
}

type Props = {
  artistId: number
  mediumList: string[]
}

const ArtworkIndexChart: React.FC<Props> = ({ artistId, mediumList }) => {
  const classes = useStyles()
  const { data, isLoading, isError } = useArtworkIndexChartAllData(artistId, mediumList)

  const seriesLine = data.map(({ name, data: items }, index) => ({
    type: 'line',
    name: `${name}`,
    id: `${name}index`,
    data: items.map((item) => [item.date.getTime(), item.index]),
    tooltip: {
      valueDecimals: 2,
    },
    color: colors[index],
  }))

  const columnLine = data.map(({ name, data: items }, index) => ({
    type: 'column',
    name: `${name} volume`,
    id: `${name}volume`,
    data: items.map((item) => [item.date.getTime(), item.volume]),
    yAxis: 1,
    color: colors[index],
  }))

  let options: Highcharts.Options | null = null

  if (data && !isLoading && !isError) {
    options = {
      chart: {
        zoomType: 'xy',
      },
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
          min: 0,
          stackLabels: {
            enabled: false,
          },
        },
      ],

      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: false,
          },
        },
      },

      legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
      },

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
