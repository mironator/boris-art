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

  const {
    data: { sales = [], values = [] },
    isLoading,
    isError,
  } = useArtworkValueChartData(id)

  const chartData = []
  const valueData = []
  const soldForSeriesData = []

  for (let i = 0; i < values.length; i += 1) {
    chartData.push([new Date(values[i].date).getTime(), values[i].valueLow, values[i].valueHigh])
    valueData.push([new Date(values[i].date).getTime(), values[i].value])
  }

  for (let i = 0; i < sales.length; i += 1) {
    soldForSeriesData.push({ x: new Date(sales[i].date).getTime(), y: sales[i].price, ...sales[i] })
  }

  let options: Highcharts.Options | null = null

  if (values && !isLoading && !isError) {
    options = {
      chart: {
        zoomType: 'xy',
      },
      rangeSelector: {
        selected: 6,
      },

      tooltip: {
        valuePrefix: '$',
        useHTML: true,
      },

      series: [
        {
          name: '',
          type: 'arearange',
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
          color: '#e08604',
          data: soldForSeriesData,
          type: 'line',
          lineWidth: 0,
          marker: {
            enabled: true,
            radius: 5,
            symbol: 'circle',
          },
          tooltip: {
            valueDecimals: 2,
            pointFormat: `
              <div style="display: table">
                <img
                  src = "{point.url}"
                  width="55"
                  height="45"
                  style="float:left;margin: 0 10px 10px 0"/>
                <div style="white-space: normal;width: 200px">{point.artworkName}</div>
              </div>
              <span>Auction house</span> <span>{point.auctionHouseName}</span>
              <br/>
              <span>Sale date</span> <span>{point.date}</span>
              <br/>
              <span>Sold for</span> <span>\${point.price}</span>
              <br/>
              `,
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
