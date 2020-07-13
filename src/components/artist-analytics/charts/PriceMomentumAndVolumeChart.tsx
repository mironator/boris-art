import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

import { usePriceMomentumAndVolumeChartData } from '@hooks/useChartData'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

type Props = {
  artistId: number
}

const PriceMomentumAndVolumeChart: React.FC<Props> = ({ artistId }) => {
  const { data, isLoading, isError } = usePriceMomentumAndVolumeChartData(artistId)

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

  let options: Highcharts.Options | null = null

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
    <>
      <HighchartsReact highcharts={Highcharts} options={options} constructorType="stockChart" />
    </>
  )
}

export default PriceMomentumAndVolumeChart
