import { Artist as IArtist, ArtistEntity } from '@interfaces/index'

export default class Artist implements IArtist {
  id: number

  name: string

  birth?: Date | undefined

  death?: Date | undefined

  qualifier?: string

  lotsCost?: number

  constructor(
    id: number,
    name: string,
    birth: Date,
    death: Date,
    qualifier: string,
    lotsCost: number
  ) {
    this.id = id
    this.name = name
    this.birth = birth
    this.death = death
    this.qualifier = qualifier
    this.lotsCost = lotsCost
  }

  static fromEntity(entity: ArtistEntity): Artist {
    return new Artist(
      entity.id,
      entity.name,
      new Date(entity.birth, 0),
      new Date(entity.death, 0),
      entity.qualifier,
      entity.lots_cost
    )
  }
}
