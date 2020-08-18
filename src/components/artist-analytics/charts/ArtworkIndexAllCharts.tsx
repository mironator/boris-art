/* eslint-disable react/no-this-in-sfc */
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import moment from 'moment'
import Highcharts, { Dictionary } from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CircularProgress, Grid } from '@material-ui/core'
import { gql, useQuery } from '@apollo/client'

import Event, { EventType } from '@models/Event'
import { useArtworkIndexChartAllData } from '@hooks/useChartData'
import mediumTypes from '@hooks/mediumTypes'
import { formatFlagEventBubble } from '@utils/formatters'
import { rangeSelector } from '@utils/charts-config'

enum Shape {
  Flag = 'flag',
  Circle = 'circlepin',
  Square = 'squarepin',
}

enum Code {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  L = 'L',
  S = 'S',
  P = 'P',
}

const EventToShapeMapper = {
  [EventType.MajorSales]: Shape.Circle,
  [EventType.LifeEvents]: Shape.Flag,
  [EventType.MajorExhibitions]: Shape.Square,
  [EventType.MajorPublications]: Shape.Square,
}

const EventToCodeMapper = {
  [EventType.MajorSales]: Code.S,
  [EventType.LifeEvents]: Code.L,
  [EventType.MajorExhibitions]: Code.E,
  [EventType.MajorPublications]: Code.P,
}

const getShapeByEventType: (
  eType: EventType
) => {
  shape: Shape
  code: Code
} = (eType) => ({
  shape: EventToShapeMapper[eType],
  code: EventToCodeMapper[eType],
})

const useStyles = makeStyles(() =>
  createStyles({
    loading: {
      height: '400px',
    },
  })
)

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

const ArtworkIndexChart: React.FC<Props> = ({ artistId, mediumList }) => {
  const classes = useStyles()
  const [isAllSeriesOn /* , setIsOnSeriesOn */] = useState<boolean>(true)
  const { data, isLoading, isError } = useArtworkIndexChartAllData(artistId, mediumList)
  const [flagData, setFlagData] = useState<Dictionary<FlagSerie[]>>()
  const { data: eventsData } = useQuery<EventsData, { artistId: number }>(GET_EVENTS, {
    variables: { artistId },
  })

  useEffect(() => {
    const foo =
      eventsData?.events.map((event: Event) => {
        const shapeData = getShapeByEventType(event.type as EventType)
        return {
          x: event.date
            ? moment.utc(event.date)
            : moment.utc(`${event.year}-07-01 12:00:00`).valueOf(),
          title: shapeData.code,
          ...event,
        }
      }) || []

    // @ts-ignore
    const bar: Dictionary<FlagSerie[]> = _.groupBy(foo, 'type')

    setFlagData(bar)
  }, [eventsData])

  const seriesLine = data.map(({ name, data: items }, index) => {
    // console.log(`[INFO] line serie: line-${index}`)
    return {
      type: 'line',
      name: `${name}`,
      id: `line-${name}`,
      data: items.map((item) => [item.date.getTime(), item.index]),
      tooltip: {
        valueDecimals: 2,
      },
      color: colors[index],
    }
  })

  const columnLine = data.map(({ name, data: items }, index) => {
    // console.log(`[INFO] column serie: line-${index}`)
    return {
      type: 'column',
      linkedTo: `line-${name}`,
      enableMouseTracking: false,
      name: `${name} volume`,
      data: items.map((item) => [item.date.getTime(), item.volume]),
      yAxis: 1,
      color: colors[index],
    }
  })

  const flagSeries = _.keys(flagData).map((flagType: string) => {
    const flagSeriesData: FlagSerie[] = _.get(flagData, flagType, [])
    const shapeData = getShapeByEventType(flagType as EventType)

    return {
      type: 'flags',
      name: `${shapeData.code}: ${flagType}`,
      data: flagSeriesData,
      onSeries: isAllSeriesOn ? 'line-all' : null,
      tooltip: {
        pointFormatter(): string {
          const { type, description } = this as Event & { pointFormatter(): string }
          return type === 'Life Events' ||
            type === 'Major Exhibitions' ||
            type === 'Major Publications'
            ? `<strong>${type}</strong><br/><div style="width: 200px;word-wrap: break-word; word-break: break-word; white-space: normal;">${description}</div>`
            : formatFlagEventBubble(this as Event & { pointFormatter(): string })
        },
      },
      shape: shapeData.shape,
    }
  })

  let options: Highcharts.Options | null = null

  if (data && !isLoading && !isError) {
    // @ts-ignore
    options = {
      rangeSelector,

      chart: {
        zoomType: 'xy',
        events: {
          load() {
            this.legend.allItems
              .filter((item) => item.name.includes('Series') /* || item.name.includes('flags') */)
              .forEach((item: any) => {
                item.legendGroup.hide()
              })
          },
          redraw() {
            this.legend.allItems
              .filter((item) => item.name.includes('Series') /* || item.name.includes('flags') */)
              .forEach((item: any) => {
                item.legendGroup.hide()
              })
          },
        },
      },
      time: {
        timezone: 'Europe/London',
      },
      tooltip: {
        useHTML: true,
      },

      title: {
        text: '',
      },

      yAxis: [
        {
          min: 0,
          labels: {
            align: 'left',
          },
          height: '70%',
          resize: {
            enabled: true,
          },
        },
        {
          labels: {
            align: 'left',
          },
          top: '70%',
          height: '30%',
          offset: 0,
          min: 0,
          stackLabels: {
            enabled: false,
          },
        },
      ],

      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: false,
          },
        },
        flags: {
          useHTML: true,
        },
        series: {
          events: {
            // legendItemClick: function() {
            //   console.log('[INFO] hide', this)
            //   if (this.name.includes('all')) {
            //     setIsOnSeriesOn(!isAllSeriesOn)
            //   }
            // },
          },
          states: {
            // hover: {
            //   lineWidth: 20,
            //   halo: {
            //     size: 5,
            //   },
            // },
          },
        },
      },

      legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
      },

      series: [...seriesLine, ...columnLine, ...flagSeries] as Highcharts.SeriesOptionsType[],
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
          <HighchartsReact
            containerProps={{ style: { height: 600 } }}
            highcharts={Highcharts}
            options={options}
            constructorType="stockChart"
          />
        )}
    </>
  )
}

export default ArtworkIndexChart
