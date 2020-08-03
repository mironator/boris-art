import {
  ReturnsVsPeriodChartDatum as IReturnsVsPeriodChartDatum,
  ReturnsVsPeriodChartDatumEntity,
} from '@interfaces/index'

export default class ReturnsVsPeriodChartDatum implements IReturnsVsPeriodChartDatum {
  period: number

  car: number

  artworkId: number

  price: number

  date: Date

  artworkName: string

  auctionHouseName: string

  url: string

  medium: string

  constructor(
    period: number,
    car: number,
    artworkId: number,
    price: number,
    date: Date,
    artworkName: string,
    auctionHouseName: string,
    url: string,
    medium: string
  ) {
    this.period = period
    this.car = car
    this.artworkId = artworkId
    this.price = price
    this.date = date
    this.artworkName = artworkName
    this.auctionHouseName = auctionHouseName
    this.url = url
    this.medium = medium
  }

  static fromEntity(entity: ReturnsVsPeriodChartDatumEntity): ReturnsVsPeriodChartDatum {
    return new ReturnsVsPeriodChartDatum(
      entity[0],
      entity[1],
      entity[2],
      entity[3],
      new Date(entity[4]),
      entity[5],
      entity[6],
      entity[7],
      entity[8]
    )
  }
}
