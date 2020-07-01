import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import fetch from 'cross-fetch'

import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

// import { Artist } from '@interfaces/index'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

// interface OwnProps {
//   artist: Artist
// }

// type Props = OwnProps

const ArtistAnalytics: React.FC<unknown> = () => {
  const [options, setOptions] = useState<Highcharts.Options>()

  useEffect(() => {
    // eslint-disable-next-line
    ; (async () => {
      const res = await fetch('https://demo-live-data.highcharts.com/aapl-ohlcv.json')
      if (res.status >= 400) {
        throw new Error('Bad response from server')
      }

      const data = await res.json()

      const ohlc = []
      const volume = []
      const dataLength = data.length
      let i = 0

      for (i; i < dataLength; i += 1) {
        ohlc.push([
          data[i][0], // the date
          data[i][1], // open
          data[i][2], // high
          data[i][3], // low
          data[i][4], // close
        ])

        volume.push([
          data[i][0], // the date
          data[i][4], // the volume
        ])
      }

      setOptions({
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
          selected: 1,
        },

        title: {
          text: '',
        },

        series: [
          {
            type: 'ohlc',
            name: 'AAPL',
            data: ohlc,
            tooltip: {
              valueDecimals: 2,
            },
          },
          {
            type: 'column',
            id: 'aapl-volume',
            name: 'AAPL Volume',
            data: volume,
            yAxis: 1,
          },
        ],
      })
    })()
  }, [])

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
