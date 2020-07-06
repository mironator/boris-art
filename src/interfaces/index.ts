/* eslint-disable camelcase */

export type Artist = {
  id: number
  name: string
  birth?: Date
  death?: Date
  qualifier?: string
  lotsCost?: number
}

export type ArtistEntity = {
  id: number
  name: string
  nationality: string
  birth: number
  death: number
  qualifier: string | 'NULL'
  lots_cost: number
}

export type PriceMomentumChartDatum = {
  volume: number
  priceMomentum: number
  date: Date
}

export type PriceMomentumChartDatumEntity = {
  volume: number
  price_momentum: number
  date: string
}
