import { gql } from 'apollo-server-micro'

import Regression from '@models/Regression'
import RegressionDS from '@graphql/data-source/regression'

export const typeDef = gql`
  extend type Query {
    regressions: [Regression]
  }

  type Regression {
    name: String
    endpoint: String
    resourceName: String
  }
`

type Context = {
  dataSources: {
    Regression: RegressionDS
  }
}

export const resolvers = {
  Query: {
    regressions: async (
      _root: unknown,
      _args: unknown,
      { dataSources }: Context
    ): Promise<Regression[]> => dataSources.Regression.getRegressions(),
  },
}

export default typeDef
