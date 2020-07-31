import React from 'react'
import _ from 'lodash'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

import { useReturnVsPeriodData } from '@hooks/useChartData'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

type Props = {
  artistId: number
}

const ReturnsVSHoldingPeriodChart: React.FC<Props> = ({ artistId }) => {
  const { data, isLoading, isError } = useReturnVsPeriodData(artistId)

  const chartData = []
  const dataLength = data.length
  let i = 0

  for (i; i < dataLength; i += 1) {
    // @ts-ignore
    chartData.push({ x: data[i].period, y: data[i].car, label: data[i].artworkId })
  }

  let options: Highcharts.Options | null = null

  if (true /* data && !isLoading && !isError */) {
    // @ts-ignore
    options = {
      chart: {
        type: 'scatter',
        zoomType: 'xy',
      },
      navigator: {
        enabled: false,
      },
      scrollbar: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      rangeSelector: {
        enabled: false,
      },
      title: {
        text: 'Realized Compound Annual Returns (%) against Holding Period',
      },
      xAxis: {
        type: 'linear',
        title: {
          // enabled: true,
          text: 'Holding Period (Years)',
        },
        labels: {
          formatter: (x: any) => `${Math.round(x.value / 12)}`,
        },
      },
      yAxis: {
        title: {
          // enabled: true,
          text: 'Realized CAR (%)',
        },
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)',
              },
            },
          },
          tooltip: {
            // headerFormat: '<b>{series.name}</b><br>',
            pointFormat:
              'Holding Period (Months): <b>{point.x}</b><br/>Realized CAR (%): <b>{point.y}</b><br/>Index: <b>{point.label}</b>',
          },
        },
      },
      series: [
        {
          name: 'Index',
          type: 'scatter',
          color: 'rgba(223, 83, 83, .5)',
          // @ts-ignore
          data: _.take(chartData, 1e3) /* TODO: fix performance issue & remove this limit */,
        },
      ],
    }
  }

  if (!options || isLoading || !chartData.length || isError) {
    return <div>Loading...</div>
  }

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} constructorType="stockChart" />
    </>
  )
}

export default ReturnsVSHoldingPeriodChart
