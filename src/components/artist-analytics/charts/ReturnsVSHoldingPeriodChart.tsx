import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { priceFormatter } from '@utils/formatters'
import moment from 'moment'

import { useReturnVsPeriodData } from '@hooks/useChartData'
import mediumTypes from '@hooks/mediumTypes'
import { ReturnsVsPeriodChartDatum } from '@interfaces/index'

const NO_IMAGE_URL = '/images/no-image-available.png'

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
              // @ts-ignore
              const {
                url,
                artworkId,
                artworkName,
                auctionHouseName,
                date,
                price,
                x,
                y,
              }: {
                url: string
                artworkId: number
                artworkName: string
                auctionHouseName: string
                date: Date
                price: number
                x: number
                y: number
              } = this

              return `
                <div style="display: flex;">
                  <img
                    src = "${url || NO_IMAGE_URL}"
                    width="55"
                    height="45"
                    style="margin: 0 10px 10px 0;
                      object-fit: scale-down;"
                  />
                  <div style="white-space: normal;width: 200px"><strong>${artworkName}</strong></div>
                </div>
                <strong>Auction house:</strong> <span>${auctionHouseName}</span>
                <br/>
                <strong>Sale date:</strong> <span>${moment(date).format('LL')}</span>
                <br/>
                <strong>Sold for:</strong> <span>${priceFormatter(price)}</span>
                <br/>
                <strong>Holding Period (Months):</strong> ${x}<span></span>
                <br/>
                <strong>Realized CAR (%):</strong> <span>${y}</span>
                <br/>
                <strong>Index:</strong> <span>${artworkId}</span>
                <br/>
              `
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
