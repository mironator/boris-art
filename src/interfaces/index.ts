/* eslint-disable camelcase */

export type ListMeta = {
  total: number
}

export type ListEntity<T> = {
  meta: T
}

export type GenericList<T> = {
  data: T[]
}

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

export type ArtistListEntity = ListEntity<ListMeta> & GenericList<ArtistEntity>
export type ArtworkListEntity = ListEntity<ListMeta> & GenericList<ArtworkEntity>

export type PriceMomentumChartDatum = {
  volume: number
  priceMomentum: number
  date: Date
}

export type ArtworkIndexChartDatum = {
  index: number
  date: Date
}

export type CompoundAnnualReturnsChartDatum = {
  car: number
  date: Date
}

export type ReturnsVsPeriodChartDatum = {
  period: number
  car: number
  artworkId: number
}

export type PriceMomentumChartDatumEntity = {
  volume: number
  price_momentum: number
  date: string
}

export type ArtworkIndexChartDatumEntity = {
  index: number
  date: string
}

export type CompoundAnnualReturnsChartDatumEntity = {
  car: number
  date: string
}

export type ReturnsVsPeriodChartDatumEntity = {
  period: number
  car: number
  artwork_id: number
}

export type Artwork = {
  creationYear: number
  sizeNotes: string
  lotImageS3Key: string
  exhibited: unknown | null
  measurementsHeight: number
  lotImageHeight: number
  markings: string
  literature: null
  imageLoadingStatus: string
  lotImageWidth: 624
  lotImagePresignedUrl: string
  measurementsUnit: string
  mediumFinal: string
  editionSize: number
  provenance: null
  lotImageLoadError: null
  measurementsDepth: null
  materials: string
  id: number
  editionCurrent: number
  conditionIn: string
  artistId: number
  name: string
  measurementsWidth: number
  lotImageSize: number
  description: string
}

export type ArtworkEntity = {
  creation_year: number
  size_notes: string
  lot_image_s3_key: string
  exhibited: unknown | null
  measurements_height: number
  lot_image_height: number
  markings: string
  literature: null
  image_loading_status: string
  lot_image_width: 624
  lot_image_presigned_url: string
  measurements_unit: string
  medium_final: string
  edition_size: number
  provenance: null
  lot_image_load_error: null
  measurements_depth: null
  materials: string
  id: number
  edition_current: number
  condition_in: string
  artist_id: number
  name: string
  measurements_width: number
  lot_image_size: number
  description: string
}
