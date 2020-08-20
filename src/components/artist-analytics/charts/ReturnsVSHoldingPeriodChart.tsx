import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

import { useReturnVsPeriodData } from '@hooks/useChartData'
import mediumTypes from '@hooks/mediumTypes'
import { ReturnsVsPeriodChartDatum } from '@interfaces/index'
import {
  getTooltipRvsHP,
  tooltipTypes,
  toggleTooltipFreze,
  freezeWorkaround,
} from '@utils/charts-config'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

type Props = {
  artistId: number
}

type PartialRecord<K extends string | number | symbol, T> = {
  [P in K]?: T
}

type GroupedByMeduim = PartialRecord<keyof typeof mediumTypes, ReturnsVsPeriodChartDatum[]>

const ReturnsVSHoldingPeriodChart: React.FC<Props> = ({ artistId }) => {
  const { data, isLoading /* , isError */ } = useReturnVsPeriodData(artistId)
  const [dataByMedium, setDataByMeduim] = useState<GroupedByMeduim>({
    ceramics: [],
  })

  useEffect(() => {
    const foo = _.take(data, 100).map((d) => ({
      x: d.period,
      y: d.car,
      ...d,
    }))
    setDataByMeduim(_.groupBy(foo, 'medium'))
  }, [data.length])

  let options: Highcharts.Options | null = null

  if (data && !isLoading) {
    const series = Object.keys(dataByMedium).map((key) => ({
      name: key,
      type: 'scatter',
      // @ts-ignore
      data: dataByMedium[key] /* TODO: fix performance issue & remove this limit */,
    }))

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
      tooltip: {
        ...freezeWorkaround(),
        useHTML: true,
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
      legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
      },
      plotOptions: {
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
            // pointFormat: `
            //   <div style="display: table">
            //     <img
            //       src = "{point.url}"
            //       width="55"
            //       height="45"
            //       style="float:left;margin: 0 10px 10px 0"/>
            //     <div style="white-space: normal;width: 200px">{point.artworkName}</div>
            //   </div>
            //   <span>Auction house</span> <span>{point.auctionHouseName}</span>
            //   <br/>
            //   <span>Sale date</span> <span>{point.date}</span>
            //   <br/>
            //   <span>Sold for: </span> <span>\${point.price}</span>
            //   <br/>
            //   <span>Holding Period (Months):</span>{point.x}<span></span>
            //   <br/>
            //   <span>Realized CAR (%): </span> <span>{point.y}</span>
            //   <br/>
            //   <span>Index: </span> <span>{point.artworkId}</span>
            //   <br/>
            //   `,
            pointFormatter() {
              const props = (this as unknown) as tooltipTypes
              const { url, artworkName, auctionHouseName, date, price, artworkId, x, y } = props

              return getTooltipRvsHP({
                url,
                artworkName,
                auctionHouseName,
                date,
                price,
                artworkId,
                x,
                y,
              })
            },
          },
        },
      },
      series,
    }
  }

  if (!options || isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} constructorType="stockChart" />
    </>
  )
}

export default ReturnsVSHoldingPeriodChart
