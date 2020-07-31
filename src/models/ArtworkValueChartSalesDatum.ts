import {
  ArtworkValueChartSalesDatum as IArtworkValueChartSalesDatum,
  ArtworkValueChartSalesDatumEntity,
} from '@interfaces/index'

export default class ArtworkValueChartSalesDatum implements IArtworkValueChartSalesDatum {
  artworkId: number

  price: number

  isRepeatSale: boolean

  date: Date

  artworkName: string

  auctionHouseName: string

  url: string

  constructor(
    artworkId: number,
    price: number,
    isRepeatSale: boolean,
    date: Date,
    artworkName: string,
    auctionHouseName: string,
    url: string
  ) {
    this.artworkId = artworkId
    this.price = price
    this.isRepeatSale = isRepeatSale
    this.date = date
    this.artworkName = artworkName
    this.auctionHouseName = auctionHouseName
    this.url = url
  }

  static fromEntity(entity: ArtworkValueChartSalesDatumEntity): ArtworkValueChartSalesDatum {
    return new ArtworkValueChartSalesDatum(
      entity[0],
      entity[1],
      entity[2],
      new Date(entity[3]),
      entity[4],
      entity[5],
      entity[6]
    )
  }
}
