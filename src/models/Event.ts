export type EventEntity = {
  id: Number
  date: Date
  description: String
  year: Number
  artist_id: Number
  artwork_id: Number
  image_url: String
  params: String
  type: String
}

export default class Event {
  id: Number
  date: Date
  description: String
  year: Number
  artistId: Number
  artworkId: Number
  imageUrl: String
  params: String
  type: String

  constructor(
    id: Number,
    date: Date,
    description: String,
    year: Number,
    artistId: Number,
    artworkId: Number,
    imageUrl: String,
    params: String,
    type: String
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
