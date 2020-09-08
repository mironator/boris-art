import { RESTDataSource } from 'apollo-datasource-rest'

import Regression from '@models/Regression'
import { RegressionEntity } from '@interfaces/index'

export default class RegressionDS extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.API_BASE_URL
  }

  async getRegressions(): Promise<Regression[]> {
    const data: RegressionEntity[] = await this.get<RegressionEntity[]>(`regressions-list/`)

    return data.map((entity: RegressionEntity) => Regression.fromEntity(entity))
  }
}
