import {
  ArtworkIndexChartDatum as IArtworkIndexChartDatum,
  ArtworkIndexChartDatumEntity,
} from '@interfaces/index'

export default class ArtworkIndexChartDatum implements IArtworkIndexChartDatum {
  index: number

  volume: number

  date: Date

  constructor(index: number, volume: number, date: Date) {
    this.index = index
    this.volume = volume
    this.date = date
  }

  static fromEntity(entity: ArtworkIndexChartDatumEntity): ArtworkIndexChartDatum {
    return new ArtworkIndexChartDatum(entity.index, entity.volume, new Date(entity.date))
  }
}
