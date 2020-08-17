import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

import { useCompoundAnnualReturnsChartData } from '@hooks/useChartData'
import { rangeSelector } from '@utils/charts-config'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

type Props = {
  artistId: number
}

const CompoundAnnualReturns: React.FC<Props> = ({ artistId }) => {
  const { data, isLoading, isError } = useCompoundAnnualReturnsChartData(artistId)

  const chartData = []
  const dataLength = data.length
  let i = 0

  for (i; i < dataLength; i += 1) {
    chartData.push([data[i].date.getTime(), +data[i].car])
  }

  let options: Highcharts.Options | null = null

  if (data && !isLoading && !isError) {
    options = {
      rangeSelector,

      chart: {
        type: 'column',
      },
      navigator: {
        enabled: false,
      },
      scrollbar: {
        enabled: false,
      },
      title: {
        text: 'Median Realized Compound Annual Returns (CAR)',
      },
      xAxis: {
        type: 'datetime',
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%',
          },
        },
      },
      tooltip: {
        pointFormat:
          '<b>{point.name}</b><br/>Median CAR (%): <span style="color:{point.color}">{point.y:.2f}%</span>',
      },
      series: [
        {
          type: 'column',
          name: 'Median CAR (%)',
          // eslint-disable-next-line
          data: chartData,
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

export default CompoundAnnualReturns
