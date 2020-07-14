import { Artwork as IArtwork, ArtworkEntity } from '@interfaces/index'

export default class Artwork implements IArtwork {
  id: number

  name: string

  creationYear: number

  sizeNotes: string

  lotImageS3Key: string

  exhibited: unknown

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

  editionCurrent: number

  conditionIn: string

  artistId: number

  measurementsWidth: number

  lotImageSize: number

  description: string

  constructor(
    id: number,
    name: string,
    creationYear: number,
    sizeNotes: string,
    lotImageS3Key: string,
    exhibited: unknown,
    measurementsHeight: number,
    lotImageHeight: number,
    markings: string,
    literature: null,
    imageLoadingStatus: string,
    lotImageWidth: 624,
    lotImagePresignedUrl: string,
    measurementsUnit: string,
    mediumFinal: string,
    editionSize: number,
    provenance: null,
    lotImageLoadError: null,
    measurementsDepth: null,
    materials: string,
    editionCurrent: number,
    conditionIn: string,
    artistId: number,
    measurementsWidth: number,
    lotImageSize: number,
    description: string
  ) {
    this.id = id
    this.name = name
    this.creationYear = creationYear
    this.sizeNotes = sizeNotes
    this.lotImageS3Key = lotImageS3Key
    this.exhibited = exhibited
    this.measurementsHeight = measurementsHeight
    this.lotImageHeight = lotImageHeight
    this.markings = markings
    this.literature = literature
    this.imageLoadingStatus = imageLoadingStatus
    this.lotImageWidth = lotImageWidth
    this.lotImagePresignedUrl = lotImagePresignedUrl
    this.measurementsUnit = measurementsUnit
    this.mediumFinal = mediumFinal
    this.editionSize = editionSize
    this.provenance = provenance
    this.lotImageLoadError = lotImageLoadError
    this.measurementsDepth = measurementsDepth
    this.materials = materials
    this.editionCurrent = editionCurrent
    this.conditionIn = conditionIn
    this.artistId = artistId
    this.measurementsWidth = measurementsWidth
    this.lotImageSize = lotImageSize
    this.description = description
  }

  static fromEntity(entity: ArtworkEntity): Artwork {
    return new Artwork(
      entity.id,
      entity.name,
      entity.creation_year,
      entity.size_notes,
      entity.lot_image_s3_key,
      entity.exhibited,
      entity.measurements_height,
      entity.lot_image_height,
      entity.markings,
      entity.literature,
      entity.image_loading_status,
      entity.lot_image_width,
      entity.lot_image_presigned_url,
      entity.measurements_unit,
      entity.medium_final,
      entity.edition_size,
      entity.provenance,
      entity.lot_image_load_error,
      entity.measurements_depth,
      entity.materials,
      entity.edition_current,
      entity.condition_in,
      entity.artist_id,
      entity.measurements_width,
      entity.lot_image_size,
      entity.description
    )
  }
}
