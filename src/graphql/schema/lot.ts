import { gql } from 'apollo-server-micro'

import LotDS from '@graphql/data-source/lot'
import ArtworkDS from '@graphql/data-source/artwork'
import ArtistDS from '@graphql/data-source/artist'
import { Artist, Artwork, Lot } from '@interfaces/index'

export const typeDef = gql`
  extend type Query {
    lot(id: Int): Lot
  }

  type Lot {
    priceEstimateMinUsdZeroied: Int
    auctionStartDate: String
    lotImageLoadError: String
    lotNum: String
    lotImagePresignedUrl: String
    priceKind: String
    artistId: Int
    artist: Artist
    artistBirth: Int
    auctionName: String
    currency: String
    artistLotsCount: Int
    lotImageSize: Int
    auctionHouseName: String
    rawLotId: Int
    imageLoadingStatus: String
    boughtIn: Int
    lotImageS3Key: String
    rawAuctionId: Int
    catalogNotes: String
    priceEstimateMaxUsdZeroied: Int
    artistName: String
    artistNationality: String
    artistQualifier: String
    descriptionId: Int
    lotImageWidth: Int
    priceEstimateMax: Int
    lotImageUrl: String
    auctionLocation: String
    priceEstimateMin: Int
    priceSold: Int
    artistDeath: Int
    artworkId: Int
    artworkName: String
    artwork: Artwork
    mediumFinal: String
    lotImageHeight: Int
    isMultipleObjects: Boolean
    auctionNum: String
    priceUsdZeroied: Int
  }
`

type Context = {
  dataSources: {
    Lot: LotDS
    Artwork: ArtworkDS
    Artist: ArtistDS
  }
}

export const resolvers = {
  Query: {
    lot: async (_root: unknown, { id }: { id: number }, { dataSources }: Context): Promise<Lot> =>
      dataSources.Lot.getLot(id),
  },
  Lot: {
    artwork: async (
      { artworkId }: Lot,
      _args: unknown,
      { dataSources }: Context
    ): Promise<Artwork | null> => dataSources.Artwork.getArtwork(artworkId),
    artist: async (
      { artistId }: Lot,
      _args: unknown,
      { dataSources }: Context
    ): Promise<Artist | null> => dataSources.Artist.getArtist(artistId),
  },
}

export default typeDef
