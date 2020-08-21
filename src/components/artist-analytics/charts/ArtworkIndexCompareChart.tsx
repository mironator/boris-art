/* eslint-disable react/no-this-in-sfc */
import React, { useState, useCallback } from 'react' // useEffect, // useState,
import _ from 'lodash'
// import moment from 'moment'
import Highcharts from 'highcharts/highstock' // Dictionary,
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CircularProgress, Grid, TextField } from '@material-ui/core'
import { gql, useQuery } from '@apollo/client'
import { useDebounce } from 'use-debounce'
import Autocomplete from '@material-ui/lab/Autocomplete'

// import Event, {
//   EventType,
// } from '@models/Event';
import Artist from '@models/Artist'

import {
  // useArtworkIndexChartAllData,
  useArtworkIndexComparisonChartData,
} from '@hooks/useChartData'
import mediumTypes from '@hooks/mediumTypes'
// import { formatFlagEventBubble } from '@utils/formatters'
import { rangeSelector } from '@utils/charts-config'

// enum Shape {
//   Flag = 'flag',
//   Circle = 'circlepin',
//   Square = 'squarepin',
// }

// enum Code {
//   A = 'A',
//   B = 'B',
//   C = 'C',
//   D = 'D',
//   E = 'E',
//   L = 'L',
//   S = 'S',
//   P = 'P',
// }

// const EventToShapeMapper = {
//   [EventType.MajorSales]: Shape.Circle,
//   [EventType.LifeEvents]: Shape.Flag,
//   [EventType.MajorExhibitions]: Shape.Square,
//   [EventType.MajorPublications]: Shape.Square,
// }

// const EventToCodeMapper = {
//   [EventType.MajorSales]: Code.S,
//   [EventType.LifeEvents]: Code.L,
//   [EventType.MajorExhibitions]: Code.E,
//   [EventType.MajorPublications]: Code.P,
// }

// const getShapeByEventType: (
//   eType: EventType
// ) => {
//   shape: Shape
//   code: Code
// } = (eType) => ({
//   shape: EventToShapeMapper[eType],
//   code: EventToCodeMapper[eType],
// })

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

const GET_ARTISTS = gql`
  query GetArtists($query: String!) {
    artists(query: $query) {
      id
      name
      birth
      death
      artworksCount
      qualifier
      lotsCost
    }
  }
`

type VariablesType = {
  query: string
}

type ArtistsData = {
  artists: Artist[]
}

// interface EventsData {
//   events: Event[]
// }

type Props = {
  artistId: number
  mediumList: Array<keyof typeof mediumTypes>
}

// type FlagSerie = {
//   x: number
//   title: string
//   text: string
// }

const ArtworkIndexCompareChart: React.FC<Props> = () => {
  const [inputText, setInputText] = useState<string>('')
  const [debouncedInputText] = useDebounce(inputText, 300)
  const [selectedArtists, setSelectedArtists] = useState<Artist[]>([])
  const onArtistsSelected = useCallback((_, value) => {
    console.log('[INFO] onArtistsSelected', value)
    setSelectedArtists(value)
  }, [])

  const { data: { artists = [] } = { artists: [] } } = useQuery<ArtistsData, VariablesType>(
    GET_ARTISTS,
    {
      variables: { query: debouncedInputText },
    }
  )

  const onInputChange = useCallback((_event, value) => {
    setInputText(value)
  }, [])

  return (
    <Grid container spacing={5} direction="column">
      <Grid item>
        <Autocomplete
          multiple
          id="tags-standard"
          options={artists}
          defaultValue={artists}
          // getOptionValue={(option) => option.id}
          getOptionLabel={(option) => option.name}
          onInputChange={onInputChange}
          onChange={onArtistsSelected}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Artists"
              placeholder="Select Artists to Compare"
            />
          )}
        />
      </Grid>
      <Grid item>
        {selectedArtists.length > 0 && <ComparisonChart artists={selectedArtists} />}
      </Grid>
    </Grid>
  )
}

const ComparisonChart: React.FC<{ artists: Artist[] }> = ({ artists }) => {
  const classes = useStyles()
  console.log(`[INFO] ComparisonChart`, artists)
  const { data, isLoading, isError } = useArtworkIndexComparisonChartData(artists)

  const seriesLine = data.map(({ name, data: items }, index) => {
    // console.log(`[INFO] line serie: line-${index}`)
    return {
      type: 'line',
      name: `${name}`,
      id: `line-${name}`,
      data: items.map((item) => [new Date(item.date).getTime(), item.index]),
      tooltip: {
        valueDecimals: 2,
      },
      color: colors[index], // getColorByName(name),
      showInNavigator: true,
    }
  })

  console.log('[INFO] seriesLine', seriesLine)

  let options: Highcharts.Options | null = null

  if (data && !isLoading && !isError) {
    // @ts-ignore
    options = {
      rangeSelector,

      chart: {
        zoomType: 'xy',
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
          labels: {
            align: 'left',
          },
          // height: '70%',
          resize: {
            enabled: true,
          },
        },
        // {
        //   labels: {
        //     align: 'left',
        //   },
        //   top: '70%',
        //   height: '30%',
        //   offset: 0,
        //   min: 0,
        //   stackLabels: {
        //     enabled: false,
        //   },
        // },
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
          compare: 'percent',
          showInNavigator: true,
          events: {
            // legendItemClick() {
            //   setTimeout(() => {
            //     const series = this.chart.legend.allItems.filter(
            //       (i) => !(i.name.includes('all') || i.name.includes(':')) && i.visible
            //     )
            //     console.log('[INFO] legendItemClick series.length', series.length, series)
            //     if (series.length === 0) {
            //       console.log('[INFO] setIsOnlyAllSeriesDisplayed', true)
            //       setIsOnlyAllSeriesDisplayed(true)
            //     } else {
            //       console.log('[INFO] setIsOnlyAllSeriesDisplayed', false)
            //       setIsOnlyAllSeriesDisplayed(false)
            //     }
            //   }, 300)
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

      series: [
        ...seriesLine,
        // ...columnLine,
        // ...flagSeries,
      ] as Highcharts.SeriesOptionsType[],
    }
  }

  return (
    <>
      {isLoading ? (
        <Grid container item justify="center" alignItems="center" className={classes.loading}>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
          <Grid item>
            <HighchartsReact
              containerProps={{ style: { height: 450 } }}
              highcharts={Highcharts}
              options={options}
              constructorType="stockChart"
            />
          </Grid>
        )}
    </>
  )
}

export default ArtworkIndexCompareChart
