import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import HighchartsMore from 'highcharts/highcharts-more'
import { gql, useQuery } from '@apollo/client'

import Event from '@models/Event'
import { useArtworkValueChartData } from '@hooks/useChartData'
import Artwork from '@models/Artwork'
import {
  rangeSelector,
  getTooltipArtworkValue,
  tooltipTypes,
  toggleTooltipFreze,
  freezeWorkaround,
} from '@utils/charts-config'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
  HighchartsMore(Highcharts)
}

const GET_EVENTS = gql`
  query GetEvents($artistId: Int!) {
    events(artistId: $artistId) {
      id
      date
      type
      description
      year
      params
      imageUrl
    }
  }
`

interface EventsData {
  events: Event[]
}

type FlagSerie = {
  x: number
  title: string
  text: string
}

const pretifyFlagText = (obj: Record<string, unknown>): string =>
  _.toPairs(obj)
    .map((pair) => `<strong>${pair[0]}: </strong>${pair[1]}<br/>`)
    .join('')

type Props = {
  artwork: Artwork
}

const ArtworkValue: React.FC<Props> = ({ artwork }) => {
  const { id, artistId } = artwork

  const [flagData, setFlagData] = useState<FlagSerie[]>([])
  const { data: eventsData } = useQuery<EventsData, { artistId: number }>(GET_EVENTS, {
    variables: { artistId },
  })

  useEffect(() => {
    const foo =
      eventsData?.events.map((event: Event) => ({
        x: (event.date ? new Date(event.date) : new Date(event.year, 0)).getTime(),
        title: event.type,
        text:
          event.type === 'Life Events'
            ? `<strong>${event.description}`
            : `<pre>${pretifyFlagText(JSON.parse(event.params))}</pre>`,
      })) || []

    setFlagData(foo)
  }, [eventsData])

  const flagSeries = {
    type: 'flags',
    data: flagData,
  }

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
      rangeSelector,

      chart: {
        zoomType: 'xy',
      },

      tooltip: {
        ...freezeWorkaround(),
        valuePrefix: '$',
        useHTML: true,
      },

      legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
      },

      plotOptions: {
        flags: {
          useHTML: true,
        },
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click() {
                // @ts-ignore
                const { chart } = this.series
                toggleTooltipFreze(chart)
              },
            },
          },
        },
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
              const props = (this as unknown) as tooltipTypes
              const { url, artworkId, artworkName, auctionHouseName, date, price } = props

              return getTooltipArtworkValue({
                url,
                artworkId,
                artworkName,
                auctionHouseName,
                date,
                price,
              })
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
              const props = (this as unknown) as tooltipTypes
              const { url, artworkId, artworkName, auctionHouseName, date, price } = props

              return getTooltipArtworkValue({
                url,
                artworkId,
                artworkName,
                auctionHouseName,
                date,
                price,
              })
            },
          },
          states: {
            hover: {
              lineWidthPlus: 0,
            },
          },
        },
        flagSeries,
      ] as Highcharts.SeriesOptionsType[],
    }
  }
  if (!options || isLoading) {
    return <div>Loading...</div>
  }

  if (!isLoading && !values.length) {
    return <span>No chart data for this artwork.</span>
  }
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} constructorType="stockChart" />
    </>
  )
}

export default ArtworkValue
