import { Lot as ILot, LotEntity } from '@interfaces/index'

export default class Lot implements ILot {
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

  boughtIn: number

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

  mediumFinal: string

  lotImageHeight: number

  isMultipleObjects: boolean

  auctionNum: string

  priceUsdZeroied: number

  constructor(
    priceEstimateMinUsdZeroied: number,
    auctionStartDate: string,
    lotImageLoadError: string,
    lotNum: string,
    lotImagePresignedUrl: string,
    priceKind: string,
    artistId: number,
    artistBirth: number,
    auctionName: string,
    currency: string,
    artistLotsCount: number,
    lotImageSize: number,
    auctionHouseName: string,
    rawLotId: number,
    imageLoadingStatus: string,
    boughtIn: number,
    lotImageS3Key: string,
    rawAuctionId: number,
    catalogNotes: string,
    priceEstimateMaxUsdZeroied: number,
    artistName: string,
    artistNationality: string,
    artistQualifier: string,
    descriptionId: number,
    lotImageWidth: number,
    priceEstimateMax: number,
    lotImageUrl: string,
    auctionLocation: string,
    priceEstimateMin: number,
    priceSold: number,
    artistDeath: number,
    artworkId: number,
    mediumFinal: string,
    lotImageHeight: number,
    isMultipleObjects: boolean,
    auctionNum: string,
    priceUsdZeroied: number
  ) {
    this.priceEstimateMinUsdZeroied = priceEstimateMinUsdZeroied
    this.auctionStartDate = auctionStartDate
    this.lotImageLoadError = lotImageLoadError
    this.lotNum = lotNum
    this.lotImagePresignedUrl = lotImagePresignedUrl
    this.priceKind = priceKind
    this.artistId = artistId
    this.artistBirth = artistBirth
    this.auctionName = auctionName
    this.currency = currency
    this.artistLotsCount = artistLotsCount
    this.lotImageSize = lotImageSize
    this.auctionHouseName = auctionHouseName
    this.rawLotId = rawLotId
    this.imageLoadingStatus = imageLoadingStatus
    this.boughtIn = boughtIn
    this.lotImageS3Key = lotImageS3Key
    this.rawAuctionId = rawAuctionId
    this.catalogNotes = catalogNotes
    this.priceEstimateMaxUsdZeroied = priceEstimateMaxUsdZeroied
    this.artistName = artistName
    this.artistNationality = artistNationality
    this.artistQualifier = artistQualifier
    this.descriptionId = descriptionId
    this.lotImageWidth = lotImageWidth
    this.priceEstimateMax = priceEstimateMax
    this.lotImageUrl = lotImageUrl
    this.auctionLocation = auctionLocation
    this.priceEstimateMin = priceEstimateMin
    this.priceSold = priceSold
    this.artistDeath = artistDeath
    this.artworkId = artworkId
    this.mediumFinal = mediumFinal
    this.lotImageHeight = lotImageHeight
    this.isMultipleObjects = isMultipleObjects
    this.auctionNum = auctionNum
    this.priceUsdZeroied = priceUsdZeroied
  }

  static fromEntity(entity: LotEntity): Lot {
    return new Lot(
      entity.price_estimate_min_usd_zeroied,
      entity.auction_start_date,
      entity.lot_image_load_error,
      entity.lot_num,
      entity.lot_image_presigned_url,
      entity.price_kind,
      entity.artist_id,
      entity.artist_birth,
      entity.auction_name,
      entity.currency,
      entity.artist_lots_count,
      entity.lot_image_size,
      entity.auction_house_name,
      entity.raw_lot_id,
      entity.image_loading_status,
      entity.bought_in,
      entity.lot_image_s3_key,
      entity.raw_auction_id,
      entity.catalog_notes,
      entity.price_estimate_max_usd_zeroied,
      entity.artist_name,
      entity.artist_nationality,
      entity.artist_qualifier,
      entity.description_id,
      entity.lot_image_width,
      entity.price_estimate_max,
      entity.lot_image_url,
      entity.auction_location,
      entity.price_estimate_min,
      entity.price_sold,
      entity.artist_death,
      entity.artwork_id,
      entity.medium_final,
      entity.lot_image_height,
      entity.is_multiple_objects,
      entity.auction_num,
      entity.price_usd_zeroied
    )
  }
}
