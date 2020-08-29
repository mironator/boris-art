import React, { useState, useCallback, useEffect } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CircularProgress, Grid, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import useArtistSearch from '@hooks/useArtistSearch'
import MediumTypes from '@hooks/mediumTypes'
import useArtworkAllIndexComparisonChartData from '@hooks/useArtworkAllIndexComparisonChartData'
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

type ItemWithCategory = Partial<Artist> & { category: string } & { code?: string }

const ArtworkIndexCompareChart: React.FC = () => {
  const [options, setOptions] = useState<ItemWithCategory[]>([])
  const [selectedArtists, setSelectedArtists] = useState<Artist[]>([])
  const [selectedQuotes, setSelectedQuotes] = useState<{ code: string }[]>([])

  const onArtistsSelected = useCallback((_, value) => {
    setSelectedArtists(value.filter((item: ItemWithCategory) => item.category === 'Artists'))
    setSelectedQuotes(
      value
        .filter((item: ItemWithCategory) => item.category === 'Finance')
        .map((i: { code: string }) => ({ code: i.code }))
    )
  }, [])

  const { artists, setInputText } = useArtistSearch()

  useEffect(() => {
    console.log('[INFO] useEffect setOptions')
    setOptions([
      { name: 'S&P 500', code: 'snp500', category: 'Finance' },
      ...selectedArtists.map((a) => ({ ...a, category: 'Artists' })),
      ...artists.map((a) => ({ ...a, category: 'Artists' })),
    ])
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

const ComparisonChart: React.FC<{ artists: Artist[]; finance: { code: string }[] }> = ({
  artists,
  finance,
}) => {
  const classes = useStyles()
  const { data, loading, error } = useArtworkAllIndexComparisonChartData(
    'artwork-index',
    artists,
    finance
  )
  const {
    data: dataHedonic,
    loading: loadingHedonic,
    error: errorHedonic,
  } = useArtworkAllIndexComparisonChartData('artwork-index-hedonic', artists, finance)
  const {
    data: dataRepeatSales,
    loading: loadingRepeatSales,
    error: errorRepeatSales,
  } = useArtworkAllIndexComparisonChartData('artwork-index-repeat-sales', artists, finance)
  const {
    data: dataRepeatSalesUnweighted,
    loading: loadingRepeatSalesUnweighted,
    error: errorRepeatSalesUnweighted,
  } = useArtworkAllIndexComparisonChartData(
    'artwork-index-repeat-sales-unweighted',
    artists,
    finance
  )

  let options: Highcharts.Options | null = null
  const artistSeries: Highcharts.SeriesOptionsType[] = []
  if (
    [
      data,
      dataHedonic,
      dataRepeatSales,
      dataRepeatSalesUnweighted,
      !loading,
      !loadingHedonic,
      !loadingRepeatSales,
      !loadingRepeatSalesUnweighted,
      !error,
      !errorHedonic,
      !errorRepeatSales,
      !errorRepeatSalesUnweighted,
    ].every((i: boolean) => !!i)
  ) {
    // @ts-ignore
    ;[
      { data, name: 'Index' },
      { data: dataHedonic, name: 'Hedonic' },
      { data: dataRepeatSales, name: 'Repeat Sales' },
      { data: dataRepeatSalesUnweighted, name: 'Repeat Sales Unweighted' },
    ].forEach(({ data: _data, name: algorithmName }) => {
      // @ts-ignore
      _data.artistData.forEach(({ artist: { name }, data: mediumItems }) => {
        // console.log(`[INFO] line serie : l ine-${index}`)

        Object.entries(mediumItems).forEach(([key, items]) => {
          artistSeries.push({
            type: 'line',
            // @ts-ignore
            name: `${name} ${MediumTypes[key]} ${algorithmName}`,
            id: `line-${name}-${key}-${algorithmName}`,
            // @ts-ignore
            data: items.map((item) => [new Date(item.date).getTime(), item.index]),
            tooltip: {
              valueDecimals: 2,
            },
            // color: colors[index], // getColorByName(name),
            showInNavigator: true,
          })
        })
      })
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
        pointFormat: '<b>{point.y}</b> ({point.change}%)<br/>',
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

      series: artistSeries,
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
              containerProps={{ style: { height: 850 } }}
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
