import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

import { useArtworkIndexChartData } from '@hooks/useChartData'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

type Props = {
  artistId: number
}

const ArtworkIndexChart: React.FC<Props> = ({ artistId }) => {
  const { data, isLoading, isError } = useArtworkIndexChartData(artistId)

  const lineData = []
  const volume = []
  const dataLength = data.length
  let i = 0

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
    return <div>Loading...</div>
  }

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} constructorType="stockChart" />
    </>
  )
}

export default ArtworkIndexChart
