import React from 'react'
import { Grid } from '@material-ui/core'
import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'

import { Artwork, Lot } from '@interfaces/index'
import LotComponent from '@components/artwork-lot'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

type Props = {
  artwork: Artwork
}

const RepeatSales: React.FC<Props> = ({ artwork }) => {
  return (
    <>
      {/*  <HighchartsReact highcharts={Highcharts} options={options} constructorType="stockChart" /> */}
      {!artwork!.lots!.length && <p>No similar sales available for this artwork.</p>}
      <Grid container item spacing={5}>
        {artwork!.lots!.map((lot: Lot) => (
          <Grid key={lot.lotNum} item container justify="center" xs={12}>
            {/* 
            // @ts-ignore */}
            <LotComponent lot={lot} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default RepeatSales
