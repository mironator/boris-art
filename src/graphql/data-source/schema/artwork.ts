import { gql } from 'apollo-server-micro'

import { Artwork } from '@interfaces/index'
import Lot from '@models/Lot'
import ArtworkDS from '@graphql/data-source/artwork'
import LotDS from '@graphql/data-source/lot'

type Context = {
  dataSources: {
    Artwork: ArtworkDS
    Lot: LotDS
  }
}

export const typeDef = gql`
  extend type Query {
    artwork(id: Int): Artwork
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
    lotIds: [Int]
    lotImageWidth: Int
    lotImagePresignedUrl: String
    lots: [Lot]
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

export const resolvers = {
  Query: {
    artwork: async (
      _root: unknown,
      { id }: { id: number },
      { dataSources }: Context
    ): Promise<Artwork> => dataSources.Artwork.getArtwork(id),
  },

  Artwork: {
    lots: async ({ lotIds }: Artwork, _args: unknown, { dataSources }: Context): Promise<Lot[]> =>
      dataSources.Lot.getLots(lotIds),
  },
}

export default typeDef
