import _ from 'lodash'

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
      (_.isArray(entity.sales) ? entity.sales : []).map((sale: ArtworkValueChartSalesDatumEntity) =>
        ArtworkValueChartSalesDatum.fromEntity(sale)
      ),
      (_.isArray(entity.values)
        ? entity.values
        : []
      ).map((value: ArtworkValueChartValuesDatumEntity) =>
        ArtworkValueChartValuesDatum.fromEntity(value)
      )
    )
  }
}
