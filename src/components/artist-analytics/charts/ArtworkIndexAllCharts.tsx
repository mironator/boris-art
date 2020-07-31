import React, { useEffect, useState, useCallback } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CircularProgress, Grid, MenuItem, Select } from '@material-ui/core'

import { useArtworkIndexChartAllData } from '@hooks/useChartData'
import mediumTypes from '@hooks/mediumTypes'

const useStyles = makeStyles(() =>
  createStyles({
    loading: {
      height: '400px',
    },
    menuItem: {
      textTransform: 'capitalize',
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
  const [medium, setMedium] = useState<Array<keyof typeof mediumTypes>>([])
  const { data, isLoading, isError } = useArtworkIndexChartAllData(artistId)
  const [filteredData, setFilteredData] = useState(data)

  useEffect(() => {
    if (data && !isLoading && !isError) {
      const newData = data.filter((item) => medium.some((mediumItem) => mediumItem === item.name))

      setFilteredData(newData)
    }
  }, [isLoading, medium])

  useEffect(() => {
    if (data && !isLoading && !isError) {
      setMedium(data.map((item) => item.name))
    }
  }, [isLoading])

  const updateMedium = useCallback((event: any) => {
    setMedium(event.target.value)
  }, [])

  const seriesLine = filteredData.map(({ name, data: items }) => ({
    type: 'line',
    name: `${name}`,
    id: `${name}index`,
    data: items.map((item) => [item.date.getTime(), item.index]),
    tooltip: {
      valueDecimals: 2,
    },
  }))

  const columnLine = filteredData
    .filter(({ name }) => name === mediumTypes.all)
    .map(({ name, data: items }) => ({
      type: 'column',
      name: `${name} volume`,
      id: `${name}volume`,
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

      legend: {
        enabled: true,
        align: 'left',
        verticalAlign: 'top',
        layout: 'vertical',
        x: 200,
      },

      series: [...seriesLine, ...columnLine] as Highcharts.SeriesOptionsType[],
    }
  }

  return (
    <>
      <Grid container direction="row" alignItems="center" justify="flex-end">
        <Select
          multiple
          displayEmpty
          value={medium}
          renderValue={() => 'Medium'}
          onChange={updateMedium}
        >
          {data.map((item) => (
            <MenuItem key={item.name} className={classes.menuItem} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
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
