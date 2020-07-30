import {
  ArtworkValueChartValuesDatum as IArtworkValueChartValuesDatum,
  ArtworkValueChartValuesDatumEntity,
} from '@interfaces/index'

export default class ArtworkValueChartValuesDatum implements IArtworkValueChartValuesDatum {
  value: number

  valueLow: number

  valueHigh: number

  date: Date

  constructor(value: number, valueLow: number, soldFor: number, date: Date) {
    this.value = value
    this.valueLow = valueLow
    this.valueHigh = soldFor
    this.date = date
  }

  static fromEntity(entity: ArtworkValueChartValuesDatumEntity): ArtworkValueChartValuesDatum {
    return new ArtworkValueChartValuesDatum(entity[0], entity[1], entity[2], new Date(entity[3]))
  }
}
