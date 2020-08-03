import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import HighchartsMore from 'highcharts/highcharts-more'
import { priceFormatter } from '@utils/formatters'
import moment from 'moment'

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
  let soldForSeriesData = []
  let similarSalesSeriesData = []

  for (let i = 0; i < values.length; i += 1) {
    chartData.push([new Date(values[i].date).getTime(), values[i].valueLow, values[i].valueHigh])
    valueData.push([new Date(values[i].date).getTime(), values[i].value])
  }

  similarSalesSeriesData = sales
    .filter((s) => s.isRepeatSale)
    .map((s) => ({ x: new Date(s.date).getTime(), y: s.price, ...s }))
  soldForSeriesData = sales
    .filter((s) => !s.isRepeatSale)
    .map((s) => ({ x: new Date(s.date).getTime(), y: s.price, ...s }))

  let options: Highcharts.Options | null = null

  if (values && !isLoading && !isError) {
    // @ts-ignore
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

      legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
      },

      series: [
        {
          name: '',
          type: 'arearange',
          data: chartData,
          tooltip: {
            // @ts-ignore
            pointFormatter() {
              return false
            },
          },
          lineWidth: 0,
          color: '#e0860433',
          states: {
            hover: {
              lineWidthPlus: 0,
            },
          },
        },
        {
          name: 'Value',
          data: valueData,
          type: 'spline',
          tooltip: {
            valueDecimals: 2,
          },
          color: '#e08604ae',
        },
        {
          name: 'Similar Sales',
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
            pointFormatter() {
              // @ts-ignore
              const {
                url,
                artworkName,
                auctionHouseName,
                date,
                price,
              }: {
                url: string
                artworkName: string
                auctionHouseName: string
                date: Date
                price: number
              } = this
              return `
                <div style="display: table">
                  <img
                    src = "${url}"
                    width="55"
                    height="45"
                    style="float:left;margin: 0 10px 10px 0"/>
                  <div style="white-space: normal;width: 200px"><strong>${artworkName}</strong></div>
                </div>
                <strong>Auction house:</strong> <span>${auctionHouseName}</span>
                <br/>
                <strong>Sale date:</strong> <span>${moment(date).format('LL')}</span>
                <br/>
                <strong>Sold for:</strong> <span>${priceFormatter(price)}</span>
                <br/>
              `
            },
          },
          states: {
            hover: {
              lineWidthPlus: 0,
            },
          },
        },
        {
          name: 'Repeat Sales',
          color: '#2d04e0',
          data: similarSalesSeriesData,
          type: 'line',
          lineWidth: 0,
          marker: {
            enabled: true,
            radius: 5,
            symbol: 'circle',
          },
          tooltip: {
            pointFormatter() {
              // @ts-ignore
              const {
                url,
                artworkName,
                auctionHouseName,
                date,
                price,
              }: {
                url: string
                artworkName: string
                auctionHouseName: string
                date: Date
                price: number
              } = this
              return `
                <div style="display: table">
                  <img
                    src = "${url}"
                    width="55"
                    height="45"
                    style="float:left;margin: 0 10px 10px 0"/>
                  <div style="white-space: normal;width: 200px"><strong>${artworkName}</strong></div>
                </div>
                <strong>Auction house:</strong> <span>${auctionHouseName}</span>
                <br/>
                <strong>Sale date:</strong> <span>${moment(date).format('LL')}</span>
                <br/>
                <strong>Sold for:</strong> <span>${priceFormatter(price)}</span>
                <br/>
              `
            },
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
