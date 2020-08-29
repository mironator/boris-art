import _ from 'lodash'
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CircularProgress, Grid, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import useArtistSearch from '@hooks/useArtistSearch'
import useArtworkIndexComparisonChartData from '@hooks/useArtworkIndexComparisonChartData'
import Artist from '@models/Artist'
import { rangeSelector } from '@utils/charts-config'

const useStyles = makeStyles(() =>
  createStyles({
    loading: {
      height: '400px',
    },
  })
)

// let colors: string[] = []

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
  // colors = Highcharts.getOptions().colors || []
}

type Props = {
  artist: Artist
}

type ItemWithCategory = Partial<Artist> & { category: string } & { code?: string }

const ArtworkIndexCompareChart: React.FC<Props> = ({ artist }) => {
  const selectedArtist = useMemo(() => ({ ...artist, category: 'Artists' }), [artist])
  const [options, setOptions] = useState<ItemWithCategory[]>([])
  const [selectedArtists, setSelectedArtists] = useState<{ id: number }[]>([{ id: artist.id }])
  const [selectedQuotes, setSelectedQuotes] = useState<{ code: string }[]>([])

  const onArtistsSelected = useCallback((_, value) => {
    setSelectedArtists(value.filter((item: ItemWithCategory) => item.category === 'Artists'))
    setSelectedQuotes(value.filter((item: ItemWithCategory) => item.category === 'Finance'))
  }, [])

  const { artists, setInputText } = useArtistSearch()

  useEffect(() => {
    setOptions(
      _.uniq(
        [
          { name: 'S&P 500', code: 'snp500', category: 'Finance' },
          ...selectedArtists.map((a) => ({ ...a, category: 'Artists' })),
          ...artists.map((a) => ({ ...a, category: 'Artists' })),
        ],
        'name'
      )
    )
  }, [artists.length])

  const onInputChange = useCallback((_event, value) => {
    setInputText(value)
  }, [])

  return (
    <Grid container spacing={5} direction="column">
      <Grid item>
        <Autocomplete
          multiple
          id="tags-standard"
          options={options}
          // getOptionValue={(option) => option.id}
          defaultValue={[selectedArtist]}
          getOptionLabel={(option) => option.name || ''}
          groupBy={(option) => option.category}
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
        {!!(selectedArtists.length || selectedQuotes.length) && (
          <ComparisonChart artists={selectedArtists} finance={selectedQuotes} />
        )}
      </Grid>
    </Grid>
  )
}

const ComparisonChart: React.FC<{ artists: { id: number }[]; finance: { code: string }[] }> = ({
  artists,
  finance,
}) => {
  const classes = useStyles()
  const { data, loading, error } = useArtworkIndexComparisonChartData(artists, finance)

  let options: Highcharts.Options | null = null
  if (data && !loading && !error) {
    const artistSeries = data.artistData.map(({ artist: { name }, data: items }) => {
      // console.log(`[INFO] line serie: line-${index}`)
      return {
        type: 'line',
        name: `${name}`,
        id: `line-${name}`,
        // @ts-ignore
        data: items.map((item) => [new Date(item.date).getTime(), item.index]),
        tooltip: {
          valueDecimals: 2,
        },
        // color: colors[index], // getColorByName(name),
        showInNavigator: true,
      }
    })

    const financeSeries = data.financeData.map(({ quote: { name }, data: items }) => {
      // console.log(`[INFO] line serie: line-${index}`)
      return {
        type: 'line',
        name: `${name}`,
        id: `line-${name}`,
        // @ts-ignore
        data: items.map((item) => [new Date(item.date).getTime(), item.index]),
        tooltip: {
          valueDecimals: 2,
        },
        // color: colors[index], // getColorByName(name),
        showInNavigator: true,
      }
    })

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

      series: [...artistSeries, ...financeSeries] as Highcharts.SeriesOptionsType[],
    }
  }

  return (
    <>
      {loading ? (
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
