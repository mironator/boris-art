import { gql } from 'apollo-server-micro'

import Artist from './artist'
import Artwork from './artwork'
import Event from './event'
import Valuation from './valuation'
import ComparisonChartTypes from './comparison-chart'
import ArtistIndexChartTypes from './artist-index-chart'

const typeDefs = gql`
  scalar Date
  scalar JSON
  scalar Timestamp

  type Query

  type File {
    uri: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Mutation {
    uploadFile(file: Upload!): File
  }
`

export default [
  typeDefs,
  Artist,
  Artwork,
  Event,
  Valuation,
  ComparisonChartTypes,
  ArtistIndexChartTypes,
]
