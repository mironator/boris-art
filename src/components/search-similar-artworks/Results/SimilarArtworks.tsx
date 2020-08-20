import React from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  Artwork,
  ArtworkValueChartSalesDatumEntity,
  ArtworkValueChartValuesDatumEntity,
} from '@interfaces/index'
import { CircularProgress, Grid } from '@material-ui/core'

import ArtworkValueChartSalesDatum from '@models/ArtworkValueChartSalesDatum'
import ArtworkValueChartValuesDatum from '@models/ArtworkValueChartValuesDatum'

import Lot from '@components/artist-lot'
import ArtworkValue from './charts/ArtworkValue'

const GET_VALUATION = gql`
  query GetValuation(
    $artist: Int
    $image: String
    $medium: String
    $year: Int
    $height: Int
    $width: Int
    $depth: Int
    $unit: String
  ) {
    valuation(
      artist: $artist
      image: $image
      medium: $medium
      year: $year
      height: $height
      width: $width
      depth: $depth
      unit: $unit
    ) {
      artworks {
        id
        name
        creationYear
        sizeNotes
        lotImagePresignedUrl
        exhibited
      }
      sales
      values
    }
  }
`

type VariablesType = {
  artist: number
  image: string
  medium: string
  year: number
  height: number
  width: number
  depth: number
  unit: string
}

type Props = VariablesType

type ValuationData = {
  valuation: {
    artworks: Partial<Artwork>[]
    sales: [number, number, boolean, string, string, string, string]
    values: [number, number, number, string]
  }
}

// @ts-ignore
const SimilarArtworks: React.FC<Props> = ({ values }) => {
  // console.log('[INFO] SimilarArtworks.render', values)
  const { loading, data } = useQuery<ValuationData, VariablesType>(GET_VALUATION, {
    variables: {
      ...values,
      year: Number(values.year),
      height: Number(values.height),
      width: Number(values.width),
      depth: Number(values.depth),
    },
  })

  // @ts-ignore
  const sales = data?.valuation?.sales?.map((sale: ArtworkValueChartSalesDatumEntity) =>
    // @ts-ignore
    ArtworkValueChartSalesDatum.fromEntity(sale)
  )
  // @ts-ignore
  const valuess = data?.valuation?.values?.map((value: ArtworkValueChartValuesDatumEntity) =>
    // @ts-ignore
    ArtworkValueChartValuesDatum.fromEntity(value)
  )

  if (loading) {
    return (
      <Grid item style={{ textAlign: 'center' }}>
        <CircularProgress />
      </Grid>
    )
  }
  return (
    <Grid spacing={5} item direction="column" container>
      <Grid item style={{ height: 400 }}>
        <ArtworkValue sales={sales} values={valuess} />
      </Grid>
      <Grid item>
        {/* <HighchartsReact highcharts={Highcharts} options={options} constructorType="stockChart" /> */}
        {!data?.valuation?.artworks?.length && <p>No similar sales available for this artwork.</p>}
        <Grid container spacing={5}>
          {data?.valuation?.artworks?.map((item) => (
            <Grid key={item.id} item container justify="center" xs={12} sm={6} md={4}>
              {/* 
            // @ts-ignore */}
              <Lot artwork={item} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SimilarArtworks
