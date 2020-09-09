import _ from 'lodash'
import { DateResolver } from 'graphql-scalars'
// import { GraphQLUpload } from 'graphql-upload'
import { resolvers as ArtistResolvers } from './data-source/schema/artist'
import { resolvers as ArtworkResolvers } from './data-source/schema/artwork'
import { resolvers as EventResolvers } from './data-source/schema/event'
import { resolvers as ComparisonChartResolvers } from './data-source/schema/comparison-chart'
import { resolvers as ArtistIndexChartResolvers } from './data-source/schema/artist-index-chart'
import { resolvers as ValuationChartResolvers } from './data-source/schema/valuation'
import { resolvers as RegressionstResolvers } from './data-source/schema/regression'
import { resolvers as LotResolvers } from './data-source/schema/lot'

const resolvers = {
  Date: DateResolver,
  Query: {},
}

export default _.merge(
  resolvers,
  ArtistResolvers,
  ArtworkResolvers,
  EventResolvers,
  ComparisonChartResolvers,
  ArtistIndexChartResolvers,
  ValuationChartResolvers,
  RegressionstResolvers,
  LotResolvers
)
