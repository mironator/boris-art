/* eslint-disable camelcase */

export enum EventType {
  MajorSales = 'Major Sales',
  LifeEvents = 'Life Events',
  MajorPublications = 'Major Publications',
  MajorExhibitions = 'Major Exhibitions',
}

export type EventEntity = {
  id: number
  date: Date
  description: string
  year: number
  artist_id: number
  artwork_id: number
  image_url: string
  params: string
  type: EventType
}

export default class Event {
  id: number

  date: Date

  description: string

  year: number

  artistId: number

  artworkId: number

  imageUrl: string

  params: string

  type: string

  constructor(
    id: number,
    date: Date,
    description: string,
    year: number,
    artistId: number,
    artworkId: number,
    imageUrl: string,
    params: string,
    type: string
  ) {
    this.id = id
    this.date = date
    this.description = description
    this.year = year
    this.artistId = artistId
    this.artworkId = artworkId
    this.imageUrl = imageUrl
    this.params = params
    this.type = type
  }

  static fromEntity(entity: EventEntity): Event {
    return new Event(
      entity.id,
      entity.date,
      entity.description,
      entity.year,
      entity.artist_id,
      entity.artwork_id,
      entity.image_url,
      entity.params,
      entity.type
    )
  }
}
