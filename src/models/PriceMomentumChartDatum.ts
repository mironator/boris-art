import {
  PriceMomentumChartDatum as IPriceMomentumChartDatum,
  PriceMomentumChartDatumEntity,
} from '@interfaces/index'

export default class PriceMomentumChartDatum implements IPriceMomentumChartDatum {
  volume: number

  priceMomentum: number

  date: Date

  constructor(volume: number, priceMomentum: number, date: Date) {
    this.volume = volume
    this.priceMomentum = priceMomentum
    this.date = date
  }

  static fromEntity(entity: PriceMomentumChartDatumEntity): PriceMomentumChartDatum {
    return new PriceMomentumChartDatum(entity.volume, entity.price_momentum, new Date(entity.date))
  }
}
