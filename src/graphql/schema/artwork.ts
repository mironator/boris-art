import { gql } from 'apollo-server-micro'

export const typeDef = gql`
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
    lastSoldAuctionHouseName: String
  }
`

export const resolvers = {}

export default typeDef
