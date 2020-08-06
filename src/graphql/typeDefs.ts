import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  scalar Date

  type Query {
    users: [User!]!
    artists(query: String, limit: Int, offset: Int): [Artist!]!
    artist(id: Int): Artist
    events(artistId: Int, limit: Int, offset: Int): [Event]
  }

  "Test type with mocked data"
  type User {
    id: Int!
    firstName: String
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
`

export default typeDefs
