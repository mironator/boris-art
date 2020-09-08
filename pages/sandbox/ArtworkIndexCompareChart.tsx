import _ from 'lodash'
import React, { useState, useCallback, useEffect } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import {
  CircularProgress,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import useArtistSearch from '@hooks/useArtistSearch'
import useArtworkAllIndicesChartData from '@hooks/useArtworkAllIndicesChartData'
import useRegressionsList from '@hooks/useRegressionsList'
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

type FinanceRecord = {
  quote: {
    name: string
  }
  data: { date: string; index: number }[]
}

const ArtworkIndexCompareChart: React.FC = () => {
  const [options, setOptions] = useState<ItemWithCategory[]>([])
  const [selectedArtists, setSelectedArtists] = useState<Artist[]>([])
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
          { name: 'S&P 500', code: 'SNP500', category: 'Finance' },
          { name: 'COMEX Delayed Price', code: 'GOLD', category: 'Finance' },
          { name: 'Dow Jones Industrial Average', code: 'DOW_JONES', category: 'Finance' },
          {
            name: 'Fidelity MSCI Real Estate Index ETF (FREL)',
            code: 'MSCI_WORLD_REAL_ESTATE',
            category: 'Finance',
          },
          ...selectedArtists.map((a) => ({ ...a, category: 'Artists' })),
          ...artists.map((a) => ({ ...a, category: 'Artists' })),
        ],
        // @ts-ignore
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
  const { data: regressionsTypes, loading: regressionLoading } = useRegressionsList()
  const [algorithms, setAlgorithms] = useState<Record<string, boolean>>({})

  const { data, loading, error } = useArtworkAllIndicesChartData(
    regressionsTypes
      .filter((item) => algorithms[item.resourceName])
      .map((item) => item.resourceName.replace(/_/g, '-')),
    artists,
    finance
  )

  useEffect(() => {
    if (regressionsTypes.length) {
      setAlgorithms(
        regressionsTypes.reduce((acc, item) => {
          acc[item.resourceName] = true
          return acc
        }, {} as Record<string, boolean>)
      )
    }
  }, [regressionsTypes])

  const checkboxChange = useCallback(
    (event) => {
      setAlgorithms({ ...algorithms, [event.target.name]: event.target.checked })
    },
    [algorithms]
  )

  let options: Highcharts.Options | null = null
  let compareOptions: Highcharts.Options | null = null
  const artistSeries: Highcharts.SeriesOptionsType[] = []
  const financeSeries: Highcharts.SeriesOptionsType[] = []

  data?.financeData?.forEach((financeItem: FinanceRecord) => {
    financeSeries.push({
      type: 'line',
      // @ts-ignore
      name: `${financeItem.quote.name}`,
      // @ts-ignore
      data: financeItem.data.map((item) => [new Date(item.date).getTime(), item.index]),
      tooltip: {
        valueDecimals: 2,
      },
      // color: colors[index], // getColorByName(name),
      showInNavigator: true,
    })
  })

  if ([data, !loading, !error].every((i: boolean) => !!i)) {
    // @ts-ignore
    data.artistData.forEach(({ artist: { name }, data: regressionItems }) => {
      // console.log(`[INFO] line serie : l ine-${index}`)
      Object.entries(regressionItems).forEach(([regressionType, mediumItems]) => {
        // @ts-ignore
        Object.entries(mediumItems).forEach(([key, items]) => {
          artistSeries.push({
            type: 'line',
            // @ts-ignore
            name: `${name}, ${key}, ${
              regressionsTypes.find(
                (item) => item.resourceName === regressionType.replace(/-/g, '_')
              )?.name
            }`,
            id: `line-${name}-${key}-${regressionType}`,
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

        events: {
          load() {
            this.legend.allItems
              .filter((item) => !item.name.includes(' all,'))
              .forEach((item: any) => item.setVisible(false))
          },
        },
      },
      time: {
        timezone: 'Europe/London',
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b>',
        valueDecimals: 2,
        split: true,
      },

      title: {
        text: '',
      },

      yAxis: {
        labels: {
          formatter() {
            return `${this.value}`
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
          showInNavigator: true,
        },
      },

      legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
      },

      series: [...artistSeries, ...financeSeries],
    }

    compareOptions = {
      rangeSelector,

      chart: {
        zoomType: 'xy',

        events: {
          load() {
            this.legend.allItems
              .filter((item) => !item.name.includes(' all,'))
              .forEach((item: any) => item.setVisible(false))
          },
        },
      },
      time: {
        timezone: 'Europe/London',
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b>  ({point.change}%)<br/>',
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

      series: [...artistSeries, ...financeSeries],
    }
  }

  return (
    <>
      {Object.keys(algorithms).length !== 0 &&
        regressionsTypes.map(({ resourceName, name }) => (
          <FormControlLabel
            key={resourceName}
            control={
              <Checkbox
                checked={algorithms[resourceName]}
                onChange={checkboxChange}
                name={resourceName}
                color="primary"
              />
            }
            label={<Typography variant="body2">{name}</Typography>}
          />
        ))}
      {loading || regressionLoading ? (
        <Grid container item justify="center" alignItems="center" className={classes.loading}>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid item>
            <HighchartsReact
              containerProps={{ style: { height: 850 } }}
              highcharts={Highcharts}
              options={compareOptions}
              constructorType="stockChart"
            />
          </Grid>
          <Grid item>
            <HighchartsReact
              containerProps={{ style: { height: 850 } }}
              highcharts={Highcharts}
              options={options}
              constructorType="stockChart"
            />
          </Grid>
        </>
      )}
    </>
  )
}

export default ArtworkIndexCompareChart
