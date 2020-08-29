import { gql } from 'apollo-server-micro'
import ComparisonChartTypes from './comparison-chart'
import ArtistIndexChartTypes from './artist-index-chart'

const typeDefs = gql`
  scalar Date
  scalar JSON
  scalar Timestamp

  type Query {
    users: [User!]!
    artists(query: String, limit: Int, offset: Int): [Artist!]!
    artist(id: Int): Artist
    events(artistId: Int, limit: Int, offset: Int): [Event]
    valuation(
      artist: Int
      image: String
      medium: String
      year: Int
      height: Int
      width: Int
      depth: Int
      unit: String
    ): Valuation
    snp500(from: Timestamp, to: Timestamp, interval: String): SNP500
  }

  type File {
    uri: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  "Test type with mocked data"
  type User {
    id: Int!
    firstName: String
  }

  type Mutation {
    uploadFile(file: Upload!): File
  }

  "Artist object containing basis scalar fields"
  type Artist {
    id: Int!
    name: String
    birth: Date
    death: Date
    qualifier: String
    lotsCost: Int
    artworksCount: Int
    lotsCount: Int
    mediumTypes: [String]
  }

  "Events either Artist Life or Artwork"
  type Event {
    id: Int!
    imageUrl: String
    date: Date
    type: String!
    description: String
    year: Int
    params: String
    artist: Artist
    artwork: Artwork
  }

  type Artwork {
    id: Int!
    name: String
    creationYear: Int
    sizeNotes: String
    lotImageS3Key: String
    exhibited: String
    measurementsHeight: Int
    lotImageHeight: Int
    markings: String
    literature: String
    imageLoadingStatus: String
    lotImageWidth: Int
    lotImagePresignedUrl: String
    measurementsUnit: String
    mediumFinal: String
    editionSize: Int
    provenance: String
    lotImageLoadError: String
    measurementsDepth: String
    materials: String
    editionCurrent: Int
    conditionIn: String
    artistId: Int
    measurementsWidth: Int
    lotImageSize: Int
    description: String
    lastPrice: Int
    dateLastSold: Date
    placeLastSold: String
  }

  type Valuation {
    artworks: [Artwork]
    sales: JSON
    values: JSON
  }

  type SNP500 {
    data: String
  }
`

export default [typeDefs, ComparisonChartTypes, ArtistIndexChartTypes]
