import React from 'react'
import { Grid } from '@material-ui/core'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

import { useComparablesChartData } from '@hooks/useChartData'
import Artwork from '@models/Artwork'

import Lot from '@components/artist-lot'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

type Props = {
  artwork: Artwork
}

const ArtworkComparables: React.FC<Props> = ({ artwork }) => {
  const { id } = artwork

  const { data, isLoading, isError } = useComparablesChartData(id)

  const chartData = []

  for (let i = 0; i < data.length; i += 1) {
    chartData.push({
      x:
        new Date(data[i].creationYear, 1, 1).getTime() + Math.round(data[i].lotImageHeight * 10000),
      y: data[i].lotImageHeight,
      ...data[i],
    })
  }

  let options: Highcharts.Options | null = null

  if (data && !isLoading && !isError) {
    // @ts-ignore
    options = {
      tooltip: {
        useHTML: true,
        pointFormat: `
          <div style="display: table">
            <img 
              src = "{point.lotImagePresignedUrl}"
              width="55"
              height="45"
              style="float:left;margin: 0 10px 10px 0"/>
            <div style="white-space: normal;width: 200px">{point.name}</div>
          </div>
          <span>Auction house</span> <span>Sotheby's</span>
          <br/>
          <span>Sale date</span> <span>Apr 2, 2005</span>
          <br/>
          <span>Sold for</span> <span>\${point.lotImageSize}</span>
          <br/>
          `,
      },
      series: [
        {
          type: 'line',
          name: 'Artwork Index',
          // @ts-ignore
          data: chartData,
        },
      ],
    }
  }
  if (!options || isLoading || !chartData.length) {
    return <div>Loading...</div>
  }
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} constructorType="stockChart" />
      <Grid container item spacing={5}>
        {data.map((item) => (
          <Grid key={item.id} item container justify="center" xs={12} sm={6} md={4}>
            {/* 
            // @ts-ignore */}
            <Lot artwork={item} />
          </Grid>
        ))}
      </Grid>
    </>
  )
  // return (
  //   <>
  //     <pre>{JSON.stringify(data, undefined, 2)}</pre>
  //   </>
  // )
}

export default ArtworkComparables
