import React, { useEffect, useState, useCallback } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CircularProgress, Grid, MenuItem, Select } from '@material-ui/core'

import { useArtworkIndexChartAllData } from '@hooks/useChartData'
import mediumTypes from '@hooks/mediumTypes'

const mediumKeys = (Object.values(mediumTypes) as unknown) as Array<keyof typeof mediumTypes>

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
  const [medium, setMedium] = useState<Array<keyof typeof mediumTypes>>(mediumKeys)
  const { data, isLoading, isError } = useArtworkIndexChartAllData(artistId)
  const [filteredData, setFilteredData] = useState(data)

  useEffect(() => {
    if (data && !isLoading && !isError) {
      const newData = data.filter((item) =>
        medium.some((mediumItem) => mediumItem === mediumTypes[item.name])
      )

      setFilteredData(newData)
    }
  }, [isLoading, medium])

  const updateMedium = useCallback((event: any) => {
    setMedium(event.target.value)
  }, [])

  const seriesLine = filteredData.map(({ name, data: items }) => ({
    type: 'line',
    name: `Artwork ${name} index`,
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
      name: `Artwork ${name} volume`,
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
          <MenuItem value={mediumTypes.all}>All</MenuItem>
          <MenuItem value={mediumTypes.paintings}>Paintings</MenuItem>
          <MenuItem value={mediumTypes.prints}>Prints</MenuItem>
          <MenuItem value={mediumTypes.undetermined}>Undetermined</MenuItem>
          <MenuItem value={mediumTypes.photographs}>Photographs</MenuItem>
          <MenuItem value={mediumTypes.jewelry}>Jewelry</MenuItem>
          <MenuItem value={mediumTypes.sculpture}>Sculpture</MenuItem>
          <MenuItem value={mediumTypes.furniture}>Furniture</MenuItem>
          <MenuItem value={mediumTypes.ceramics}>Ceramics</MenuItem>
          <MenuItem value={mediumTypes.other}>Other</MenuItem>
          <MenuItem value={mediumTypes.worksOnPaper}>Works on paper</MenuItem>
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
