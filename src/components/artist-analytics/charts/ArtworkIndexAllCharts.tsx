/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CircularProgress, Grid } from '@material-ui/core'
import { gql, useQuery } from '@apollo/client'

import Event from '@models/Event'
import { useArtworkIndexChartAllData } from '@hooks/useChartData'
import mediumTypes from '@hooks/mediumTypes'

const useStyles = makeStyles(() =>
  createStyles({
    loading: {
      height: '400px',
    },
  })
)

const getVolumeChartByEvent = ({ target }: any) => {
  const {
    name,
    chart: { series },
  } = target

  return series.find((item: any) => item.name === `${name} volume`)
}

let colors: string[] = []

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
  colors = Highcharts.getOptions().colors || []
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

type Props = {
  artistId: number
  mediumList: Array<keyof typeof mediumTypes>
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

const ArtworkIndexChart: React.FC<Props> = ({ artistId, mediumList }) => {
  const classes = useStyles()
  const { data, isLoading, isError } = useArtworkIndexChartAllData(artistId, mediumList)
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

  const seriesLine = data.map(({ name, data: items }, index) => ({
    type: 'line',
    name: `${name}`,
    id: `${name}index`,
    data: items.map((item) => [item.date.getTime(), item.index]),
    tooltip: {
      valueDecimals: 2,
    },
    color: colors[index],
  }))

  const columnLine = data.map(({ name, data: items }, index) => ({
    type: 'column',
    name: `${name} volume`,
    id: `${name}volume`,
    data: items.map((item) => [item.date.getTime(), item.volume]),
    yAxis: 1,
    color: colors[index],
  }))

  const flagSeries = {
    type: 'flags',
    data: flagData,
  }

  let options: Highcharts.Options | null = null

  if (data && !isLoading && !isError) {
    options = {
      chart: {
        zoomType: 'xy',
        events: {
          load() {
            this.legend.allItems
              .filter((item) => item.name.includes('volume'))
              .forEach((item: any) => {
                item.legendGroup.hide()
              })
          },
        },
      },
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
          min: 0,
          stackLabels: {
            enabled: false,
          },
        },
      ],

      plotOptions: {
        series: {
          events: {
            hide: (event) => {
              const volumeChart = getVolumeChartByEvent(event)

              volumeChart?.hide()
            },
            show: (event) => {
              const volumeChart = getVolumeChartByEvent(event)
              volumeChart?.show()
            },
          },
        },
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: false,
          },
        },
        flags: {
          useHTML: true,
        },
      },

      legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
      },

      series: [...seriesLine, ...columnLine, flagSeries] as Highcharts.SeriesOptionsType[],
    }
  }

  return (
    <>
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
