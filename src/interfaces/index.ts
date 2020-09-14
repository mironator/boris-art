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

export enum MediumType {
  all = 'all',
  paintings = 'paintings',
  prints = 'prints',
  undetermined = 'undetermined',
  photographs = 'photographs',
  jewelry = 'jewelry',
  sculpture = 'sculpture',
  furniture = 'furniture',
  ceramics = 'ceramics',
  other = 'other',
  worksOnPaper = 'works on paper',
}

export type Artist = {
  id: number
  name: string
  birth?: Date
  bio?: string
  photoS3Key?: string
  photoPresignedUrl?: string
  death?: Date
  qualifier?: string
  lotsCost?: number
  artworksCount?: number
  lotsCount?: number
  mediumTypes?: MediumType[]
  maxPriceSold: number
  minPriceSold: number
  maxDateSold: Date
  minDateSold: Date
}

export type ArtistEntity = {
  id: number
  name: string
  nationality: string
  bio: string
  birth: number
  death: number
  qualifier: string | 'NULL'
  lots_cost: number
  artworks_count: number
  lots_count: number
  photo_s3_key: string
  photo_presigned_url: string
  max_price_sold: number
  min_price_sold: number
  max_date_sold: string
  min_date_sold: string
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
  volume: number
  date: Date
}

export type ArtworkIndexComparisonChartDatum = {
  index: number
  medium: null
  volume: number
  date: Date
  artist_id: number
}

export type CompoundAnnualReturnsChartDatum = {
  car: number
  date: Date
}

export type ReturnsVsPeriodChartDatum = {
  period: number
  car: number
  artworkId: number
  price: number
  date: Date
  artworkName: string
  auctionHouseName: string
  url: string
  medium: string
}

export type ComparablesChartDatum = {
  description: string
  exhibited: unknown
  lotImagePresignedUrl: string
  lotImageSize: number
  editionSize: number
  literature: string
  lotImageLoadError: unknown
  mediumFinal: string
  conditionIn: unknown
  measurementsDepth: unknown
  lotImageHeight: number
  creationYear: number
  markings: string
  artistId: number
  id: number
  provenance: unknown
  editionCurrent: number
  imageLoadingStatus: string
  materials: string
  lotImageWidth: number
  measurementsUnit: string
  measurementsWidth: number
  measurementsHeight: number
  sizeNotes: string
  name: string
  lotImageS3Key: string
  similarity: number
  lastPrice: number
  dateLastSold: Date
  placeLastSold: string
}

export type ArtworkValueChartDatum = {
  sales: ArtworkValueChartSalesDatum[]
  values: ArtworkValueChartValuesDatum[]
}

export type PriceMomentumChartDatumEntity = {
  volume: number
  price_momentum: number
  date: string
}

export type ArtworkIndexChartDatumEntity = {
  index: number
  volume: number
  date: string
}

export type CompoundAnnualReturnsChartDatumEntity = {
  car: number
  date: string
}

export type ReturnsVsPeriodChartDatumEntity = [
  number,
  number,
  number,
  number,
  string,
  string,
  string,
  string,
  string
]

export type ComparablesChartDatumEntity = {
  date_last_sold: Date
  place_last_sold: string
  description: string
  exhibited: unknown
  lot_image_presigned_url: string
  lot_image_size: number
  edition_size: number
  literature: string
  lot_image_load_error: unknown
  medium_final: string
  condition_in: unknown
  measurements_depth: unknown
  lot_image_height: number
  creation_year: number
  markings: string
  artist_id: number
  id: number
  provenance: unknown
  edition_current: number
  image_loading_status: string
  materials: string
  lot_image_width: number
  measurements_unit: string
  measurements_width: number
  measurements_height: number
  size_notes: string
  name: string
  last_price: number
  lot_image_s3_key: string
  similarity: number
  last_sold_auction_house_name: string
}

export type ArtworkValueChartDatumEntity = {
  sales: ArtworkValueChartSalesDatumEntity[]
  values: ArtworkValueChartValuesDatumEntity[]
}

export type ArtworkValueChartSalesDatumEntity = [
  number,
  number,
  boolean,
  string,
  string,
  string,
  string
]

export type ArtworkValueChartSalesDatum = {
  artworkId: number
  price: number
  isRepeatSale: boolean
  date: Date
  artworkName: string
  auctionHouseName: string
  url: string
}

export type ArtworkValueChartValuesDatumEntity = [number, number, number, string]

export type ArtworkValueChartValuesDatum = {
  value: number
  valueLow: number
  valueHigh: number
  date: Date
}

export type Artwork = {
  creationYear: number
  dateLastSold: Date
  placeLastSold: string
  sizeNotes: string
  lotImageS3Key: string
  exhibited: unknown | null
  measurementsHeight: number
  lotImageHeight: number
  lotIds: number[]
  lots?: Lot[]
  markings: string
  literature: string
  imageLoadingStatus: string
  lotImageWidth: number
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
  lastPrice: number
  lastSoldAuctionHouseName: string
  similarity: number
}

export type ArtworkEntity = {
  creation_year: number
  date_last_sold: string
  place_last_sold: string
  last_sold_auction_house_name: string
  size_notes: string
  lot_image_s3_key: string
  exhibited: unknown | null
  measurements_height: number
  lot_ids: number[]
  lot_image_height: number
  markings: string
  literature: string
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
  last_price: number
  similarity: number
}

export type Regression = {
  name: string
  endpoint: string
  resourceName: string
}

export type RegressionEntity = {
  name: string
  endpoint: string
  resource_name: string
}

export type LotEntity = {
  price_estimate_min_usd_zeroied: number
  auction_start_date: string
  lot_image_load_error: string
  lot_num: string
  lot_image_presigned_url: string
  price_kind: string
  artist_id: number
  artist_birth: number
  auction_name: string
  currency: string
  artist_lots_count: number
  lot_image_size: number
  auction_house_name: string
  raw_lot_id: number
  image_loading_status: string
  bought_in: boolean
  lot_image_s3_key: string
  raw_auction_id: number
  catalog_notes: string
  price_estimate_max_usd_zeroied: number
  artist_name: string
  artist_nationality: string
  artist_qualifier: string
  description_id: number
  lot_image_width: number
  price_estimate_max: number
  lot_image_url: string
  auction_location: string
  price_estimate_min: number
  price_sold: number
  artist_death: number
  artwork_id: number
  artwork_name: string
  medium_final: string
  lot_image_height: number
  is_multiple_objects: boolean
  auction_num: string
  price_usd_zeroied: number
}

export type Lot = {
  priceEstimateMinUsdZeroied: number
  auctionStartDate: string
  lotImageLoadError: string
  lotNum: string
  lotImagePresignedUrl: string
  priceKind: string
  artistId: number
  artistBirth: number
  auctionName: string
  currency: string
  artistLotsCount: number
  lotImageSize: number
  auctionHouseName: string
  rawLotId: number
  imageLoadingStatus: string
  boughtIn: boolean
  lotImageS3Key: string
  rawAuctionId: number
  catalogNotes: string
  priceEstimateMaxUsdZeroied: number
  artistName: string
  artistNationality: string
  artistQualifier: string
  descriptionId: number
  lotImageWidth: number
  priceEstimateMax: number
  lotImageUrl: string
  auctionLocation: string
  priceEstimateMin: number
  priceSold: number
  artistDeath: number
  artworkId: number
  artworkName: string
  artwork: Artwork
  mediumFinal: string
  lotImageHeight: number
  isMultipleObjects: boolean
  auctionNum: string
  priceUsdZeroied: number
}
