import { Artist as IArtist, ArtistEntity, MediumType } from '@interfaces/index'

export default class Artist implements IArtist {
  id: number

  name: string

  bio?: string

  photoS3Key?: string

  photoPresignedUrl?: string

  birth?: Date | undefined

  death?: Date | undefined

  qualifier?: string

  lotsCost?: number

  artworksCount?: number

  lotsCount?: number

  mediumTypes?: MediumType[]

  maxDateSold: Date

  minDateSold: Date

  maxPriceSold: number

  minPriceSold: number

  constructor(
    id: number,
    name: string,
    bio: string,
    photoS3Key: string,
    photoPresignedUrl: string,
    birth: Date,
    death: Date,
    qualifier: string,
    lotsCost: number,
    artworksCount: number,
    lotsCount: number,
    maxDateSold: Date,
    minDateSold: Date,
    maxPriceSold: number,
    minPriceSold: number,
    mediumTypes?: MediumType[]
  ) {
    this.id = id
    this.name = name
    this.bio = bio
    this.photoS3Key = photoS3Key
    this.photoPresignedUrl = photoPresignedUrl
    this.birth = birth
    this.death = death
    this.qualifier = qualifier
    this.lotsCost = lotsCost
    this.artworksCount = artworksCount
    this.lotsCount = lotsCount
    this.maxDateSold = maxDateSold
    this.minDateSold = minDateSold
    this.maxPriceSold = maxPriceSold
    this.minPriceSold = minPriceSold
    this.mediumTypes = mediumTypes
  }

  static fromEntity(entity: ArtistEntity): Artist {
    return new Artist(
      entity.id,
      entity.name,
      entity.bio,
      entity.photo_s3_key,
      entity.photo_presigned_url,
      new Date(entity.birth, 0),
      new Date(entity.death, 0),
      entity.qualifier,
      entity.lots_cost,
      entity.artworks_count,
      entity.lots_count,
      new Date(entity.max_date_sold),
      new Date(entity.min_date_sold),
      entity.max_price_sold,
      entity.min_price_sold
    )
  }
}
