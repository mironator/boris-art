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
  const dataLength = data.length
  let i = 0

  for (i; i < dataLength; i += 1) {
    lineData.push([data[i].date.getTime(), Math.round(data[i].index * 100)])
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

      series: [
        {
          type: 'line',
          name: 'Artwork Index',
          data: lineData,
          tooltip: {
            valueDecimals: 2,
          },
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
