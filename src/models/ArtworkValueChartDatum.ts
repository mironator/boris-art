import {
  ArtworkValueChartDatum as IArtworkValueChartDatum,
  ArtworkValueChartDatumEntity,
  ArtworkValueChartSalesDatumEntity,
  ArtworkValueChartValuesDatumEntity,
} from '@interfaces/index'

import ArtworkValueChartSalesDatum from '@models/ArtworkValueChartSalesDatum'
import ArtworkValueChartValuesDatum from '@models/ArtworkValueChartValuesDatum'

export default class ArtworkValueChartDatum implements IArtworkValueChartDatum {
  sales: ArtworkValueChartSalesDatum[]

  values: ArtworkValueChartValuesDatum[]

  constructor(sales: ArtworkValueChartSalesDatum[], values: ArtworkValueChartValuesDatum[]) {
    this.sales = sales
    this.values = values
  }

  static fromEntity(entity: ArtworkValueChartDatumEntity): ArtworkValueChartDatum {
    return new ArtworkValueChartDatum(
      entity.sales.map((sale: ArtworkValueChartSalesDatumEntity) =>
        ArtworkValueChartSalesDatum.fromEntity(sale)
      ),
      entity.values.map((value: ArtworkValueChartValuesDatumEntity) =>
        ArtworkValueChartValuesDatum.fromEntity(value)
      )
    )
  }
}
