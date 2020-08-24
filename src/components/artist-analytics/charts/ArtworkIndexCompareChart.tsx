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
        pointFormat:
          '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
        valueDecimals: 2,
        split: true,
      },

      title: {
        text: '',
      },

      yAxis: {
        labels: {
          formatter() {
            return `${(this.value > 0 ? ' + ' : '') + this.value}%`
          },
        },
        plotLines: [
          {
            value: 0,
            width: 2,
            color: 'silver',
          },
        ],
      },

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
        },
      },

      legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
      },

      series: [...seriesLine] as Highcharts.SeriesOptionsType[],
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
