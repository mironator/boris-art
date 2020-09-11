import _ from 'lodash'
import { DateResolver } from 'graphql-scalars'
// import { GraphQLUpload } from 'graphql-upload'
import { resolvers as ArtistResolvers } from './schema/artist'
import { resolvers as ArtworkResolvers } from './schema/artwork'
import { resolvers as EventResolvers } from './schema/event'
import { resolvers as ComparisonChartResolvers } from './schema/comparison-chart'
import { resolvers as ArtistIndexChartResolvers } from './schema/artist-index-chart'
import { resolvers as ValuationChartResolvers } from './schema/valuation'
import { resolvers as RegressionstResolvers } from './schema/regression'
import { resolvers as LotResolvers } from './schema/lot'

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
