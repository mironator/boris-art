import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { Artist } from '@interfaces/index'
import useChartData from '@hooks/useChartData'

// import { Artist } from '@interfaces/index'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

interface OwnProps {
  artistInfo: Artist
}

type Props = OwnProps

const ArtistAnalytics: React.FC<Props> = ({ artistInfo }) => {
  let options: Highcharts.Options | null = null

  const { data, isLoading, isError } = useChartData(artistInfo.id)

  const ohlc = []
  const volume = []
  const dataLength = data.length
  let i = 0

  for (i; i < dataLength; i += 1) {
    ohlc.push([data[i].date.getTime(), Math.round(data[i].priceMomentum * 100)])

    volume.push([
      data[i].date.getTime(), // the date
      data[i].volume, // the volume
    ])
  }

  if (data && !isLoading && !isError) {
    options = {
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
      rangeSelector: {
        allButtonsEnabled: true,
        selected: 6,
      },

      title: {
        text: '',
      },

      series: [
        {
          type: 'line',
          name: 'Price Momentum',
          data: ohlc,
          tooltip: {
            valueDecimals: 2,
          },
        },
        {
          type: 'column',
          id: 'aapl-volume',
          name: 'Volume',
          data: volume,
          yAxis: 1,
        },
      ],
    }
  }
  if (!options || isLoading || !ohlc.length || !volume.length) {
    return <div>Loading...</div>
  }
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h5" component="h2">
          Chart for artworks over the years
        </Typography>
      </Grid>
      <Grid item>
        <HighchartsReact highcharts={Highcharts} options={options} constructorType="stockChart" />
      </Grid>
    </Grid>
  )
}

export default ArtistAnalytics
