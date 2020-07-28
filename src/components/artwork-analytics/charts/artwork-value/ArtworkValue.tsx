import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import HighchartsMore from 'highcharts/highcharts-more'

import { useArtworkValueChartData } from '@hooks/useChartData'
import Artwork from '@models/Artwork'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
  HighchartsMore(Highcharts)
}

type Props = {
  artwork: Artwork
}

const ArtworkValue: React.FC<Props> = ({ artwork }) => {
  const { id } = artwork

  const { data, isLoading, isError } = useArtworkValueChartData(id)

  const chartData = []
  const valueData = []
  const soldForSeriesData = []

  for (let i = 0; i < data.length; i += 1) {
    chartData.push([new Date(data[i].date).getTime(), data[i].valueLow, data[i].valueHigh])
    valueData.push([new Date(data[i].date).getTime(), data[i].value])
    if (data[i].soldFor) {
      soldForSeriesData.push([new Date(data[i].date).getTime(), data[i].soldFor])
    }
  }

  let options: Highcharts.Options | null = null

  if (data && !isLoading && !isError) {
    options = {
      rangeSelector: {
        selected: 6,
      },

      tooltip: {
        valuePrefix: '$',
      },

      series: [
        {
          type: 'arearange',
          name: 'Value High/Low',
          data: chartData,
        },
        {
          name: 'Value',
          data: valueData,
          type: 'spline',
          tooltip: {
            valueDecimals: 2,
          },
        },
        {
          name: 'Sold for',
          data: soldForSeriesData,
          type: 'line',
          lineWidth: 0,
          marker: {
            enabled: true,
            radius: 2,
          },
          tooltip: {
            valueDecimals: 2,
          },
          states: {
            hover: {
              lineWidthPlus: 0,
            },
          },
        },
      ],
    }
  }
  if (!options || isLoading || !chartData.length) {
    return <div>Loading...</div>
  }
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} constructorType="stockChart" />
    </>
  )
}

export default ArtworkValue
