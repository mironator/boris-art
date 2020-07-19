import {
  CompoundAnnualReturnsChartDatum as ICompoundAnnualReturnsChartDatum,
  CompoundAnnualReturnsChartDatumEntity,
} from '@interfaces/index'

export default class CompoundAnnualReturnsChartDatum implements ICompoundAnnualReturnsChartDatum {
  car: number

  date: Date

  constructor(car: number, date: Date) {
    this.car = car
    this.date = date
  }

  static fromEntity(entity: CompoundAnnualReturnsChartDatumEntity): CompoundAnnualReturnsChartDatum {
    return new CompoundAnnualReturnsChartDatum(entity.car, new Date(entity.date))
  }
}
