import {
  ArtworkValueChartDatum as IArtworkValueChartDatum,
  ArtworkValueChartDatumEntity,
} from '@interfaces/index'

export default class ArtworkValueChartDatum implements IArtworkValueChartDatum {
  value: number

  valueLow: number

  soldFor: number

  valueHigh: number

  date: Date

  constructor(value: number, valueLow: number, soldFor: number, valueHigh: number, date: string) {
    this.value = value
    this.valueLow = valueLow
    this.soldFor = soldFor
    this.valueHigh = valueHigh
    this.date = new Date(date)
  }

  static fromEntity(entity: ArtworkValueChartDatumEntity): ArtworkValueChartDatum {
    return new ArtworkValueChartDatum(
      entity.value,
      entity.value_low,
      entity.sold_for,
      entity.value_high,
      entity.date
    )
  }
}
