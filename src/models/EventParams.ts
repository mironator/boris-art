/* eslint-disable camelcase */
export type EventParamsEntity = {
  creation_year?: number
  materials?: string
  medium?: string
  name?: string
  auction_start_date?: string
  auction_name?: string
  auction_location?: string
  auction_house_name?: string
  price?: number
}

export default class EventParams {
  creationYear?: number

  materials?: string

  medium?: string

  name?: string

  auctionStartDate?: string

  auctionName?: string

  auctionLocation?: string

  auctionHouseName?: string

  price?: number

  constructor(
    creationYear?: number,
    materials?: string,
    medium?: string,
    name?: string,
    auctionStartDate?: string,
    auctionName?: string,
    auctionLocation?: string,
    auctionHouseName?: string,
    price?: number
  ) {
    this.creationYear = creationYear
    this.materials = materials
    this.medium = medium
    this.name = name
    this.auctionStartDate = auctionStartDate
    this.auctionName = auctionName
    this.auctionLocation = auctionLocation
    this.auctionHouseName = auctionHouseName
    this.price = price
  }

  static fromEntity(entity: EventParamsEntity = {}): EventParams {
    return new EventParams(
      entity?.creation_year,
      entity?.materials,
      entity?.medium,
      entity?.name,
      entity?.auction_start_date,
      entity?.auction_name,
      entity?.auction_location,
      entity?.auction_house_name,
      entity?.price
    )
  }
}
