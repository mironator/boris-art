import {
  ReturnsVsPeriodChartDatum as IReturnsVsPeriodChartDatum,
  ReturnsVsPeriodChartDatumEntity,
} from '@interfaces/index'

export default class ReturnsVsPeriodChartDatum implements IReturnsVsPeriodChartDatum {
  period: number
  car: number
  artworkId: number

  constructor(period: number, car: number, artworkId: number) {
    this.period = period
    this.car = car
    this.artworkId = artworkId
  }

  static fromEntity(entity: ReturnsVsPeriodChartDatumEntity): ReturnsVsPeriodChartDatum {
    return new ReturnsVsPeriodChartDatum(entity.period, entity.car, entity.artwork_id)
  }
}
