import {
  ComparablesChartDatum as IComparablesChartDatum,
  ComparablesChartDatumEntity,
} from '@interfaces/index'

export default class ComparablesChartDatum implements IComparablesChartDatum {
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

  lastSoldAuctionHouseName: string

  constructor(
    description: string,
    exhibited: unknown,
    lotImagePresignedUrl: string,
    lotImageSize: number,
    editionSize: number,
    literature: string,
    lotImageLoadError: unknown,
    mediumFinal: string,
    conditionIn: unknown,
    measurementsDepth: unknown,
    lotImageHeight: number,
    creationYear: number,
    markings: string,
    artistId: number,
    id: number,
    provenance: unknown,
    editionCurrent: number,
    imageLoadingStatus: string,
    materials: string,
    lotImageWidth: number,
    measurementsUnit: string,
    measurementsWidth: number,
    measurementsHeight: number,
    sizeNotes: string,
    name: string,
    lotImageS3Key: string,
    similarity: number,
    lastPrice: number,
    dateLastSold: Date,
    placeLastSold: string,
    lastSoldAuctionHouseName: string
  ) {
    this.description = description
    this.exhibited = exhibited
    this.lotImagePresignedUrl = lotImagePresignedUrl
    this.lotImageSize = lotImageSize
    this.editionSize = editionSize
    this.literature = literature
    this.lotImageLoadError = lotImageLoadError
    this.mediumFinal = mediumFinal
    this.conditionIn = conditionIn
    this.measurementsDepth = measurementsDepth
    this.lotImageHeight = lotImageHeight
    this.creationYear = creationYear
    this.markings = markings
    this.artistId = artistId
    this.id = id
    this.provenance = provenance
    this.editionCurrent = editionCurrent
    this.imageLoadingStatus = imageLoadingStatus
    this.materials = materials
    this.lotImageWidth = lotImageWidth
    this.measurementsUnit = measurementsUnit
    this.measurementsWidth = measurementsWidth
    this.measurementsHeight = measurementsHeight
    this.sizeNotes = sizeNotes
    this.name = name
    this.lotImageS3Key = lotImageS3Key
    this.similarity = similarity
    this.lastPrice = lastPrice
    this.dateLastSold = dateLastSold
    this.placeLastSold = placeLastSold
    this.lastSoldAuctionHouseName = lastSoldAuctionHouseName
  }

  static fromEntity(entity: ComparablesChartDatumEntity): ComparablesChartDatum {
    return new ComparablesChartDatum(
      entity.description,
      entity.exhibited,
      entity.lot_image_presigned_url,
      entity.lot_image_size,
      entity.edition_size,
      entity.literature,
      entity.lot_image_load_error,
      entity.medium_final,
      entity.condition_in,
      entity.measurements_depth,
      entity.lot_image_height,
      entity.creation_year,
      entity.markings,
      entity.artist_id,
      entity.id,
      entity.provenance,
      entity.edition_current,
      entity.image_loading_status,
      entity.materials,
      entity.lot_image_width,
      entity.measurements_unit,
      entity.measurements_width,
      entity.measurements_height,
      entity.size_notes,
      entity.name,
      entity.lot_image_s3_key,
      entity.similarity,
      entity.last_price,
      new Date(entity.date_last_sold),
      entity.place_last_sold,
      entity.last_sold_auction_house_name
    )
  }
}
