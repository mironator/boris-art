import _ from 'lodash'
import { RESTDataSource } from 'apollo-datasource-rest'

import Lot from '@models/Lot'
import { LotEntity } from '@interfaces/index'

type LotResponse = {
  payload: {
    lot: LotEntity[]
  }
}

export default class LotDS extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.API_BASE_URL
  }

  async getLot(id: number): Promise<Lot> {
    const data = await this.get<LotResponse>(`/lot/${id}`)
    const entity = _.get(data, 'lot[0]') as LotEntity

    return Lot.fromEntity(entity)
  }

  async getLots(ids: number[]): Promise<Lot[]> {
    return await Promise.all(ids.map((id) => this.getLot(id)))
  }
}
