import {
  ArtworkIndexChartDatum as IArtworkIndexChartDatum,
  ArtworkIndexChartDatumEntity,
} from '@interfaces/index'

export default class ArtworkIndexChartDatum implements IArtworkIndexChartDatum {
  index: number
  date: Date

  constructor(index: number, date: Date) {
    this.index = index
    this.date = date
  }

  static fromEntity(entity: ArtworkIndexChartDatumEntity): ArtworkIndexChartDatum {
    return new ArtworkIndexChartDatum(entity.index, new Date(entity.date))
  }
}
