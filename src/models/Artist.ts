import { Artist as IArtist, ArtistEntity } from '@interfaces/index'

export default class Artist implements IArtist {
  id: number

  name: string

  bio?: string

  birth?: Date | undefined

  death?: Date | undefined

  qualifier?: string

  lotsCost?: number

  artworksCount?: number

  lotsCount?: number

  constructor(
    id: number,
    name: string,
    bio: string,
    birth: Date,
    death: Date,
    qualifier: string,
    lotsCost: number,
    artworksCount: number,
    lotsCount: number
  ) {
    this.id = id
    this.name = name
    this.bio = bio
    this.birth = birth
    this.death = death
    this.qualifier = qualifier
    this.lotsCost = lotsCost
    this.artworksCount = artworksCount
    this.lotsCount = lotsCount
  }

  static fromEntity(entity: ArtistEntity): Artist {
    return new Artist(
      entity.id,
      entity.name,
      entity.bio,
      new Date(entity.birth, 0),
      new Date(entity.death, 0),
      entity.qualifier,
      entity.lots_cost,
      entity.artworks_count,
      entity.lots_count
    )
  }
}
