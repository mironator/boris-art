import { Regression as IRegression, RegressionEntity } from '@interfaces/index'

export default class Regression implements IRegression {
  name: string
  endpoint: string
  resourceName: string
  constructor(name: string, endpoint: string, resourceName: string) {
    this.name = name
    this.endpoint = endpoint
    this.resourceName = resourceName
  }

  static fromEntity(entity: RegressionEntity): Regression {
    return new Regression(entity.name, entity.endpoint, entity.resource_name)
  }
}
