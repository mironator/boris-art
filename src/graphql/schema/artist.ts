import { gql } from 'apollo-server-micro'

import { MediumTypes } from '@interfaces/index'
import Artist from '@models/Artist'
import ArtistDS from '@graphql/data-source/artist'

export const typeDef = gql`
  extend type Query {
    artists(query: String, limit: Int, offset: Int): [Artist!]!
    artist(id: Int): Artist
  }

  "Artist object containing basis scalar fields"
  type Artist {
    id: Int!
    name: String
    bio: String
    birth: Date
    death: Date
    qualifier: String
    lotsCost: Int
    artworksCount: Int
    lotsCount: Int
    mediumTypes: [String]
  }
`

type Context = {
  dataSources: {
    Artist: ArtistDS
  }
}

export const resolvers = {
  Query: {
    artists: async (
      _root: unknown,
      args: { query: string; limit: number; offset: number },
      { dataSources }: Context
    ): Promise<Artist[]> => dataSources.Artist.getArtists(args),
    artist: async (
      _root: unknown,
      { id }: { id: number },
      { dataSources }: Context
    ): Promise<Artist> => dataSources.Artist.getArtist(id),
  },
  Artist: {
    mediumTypes: async (
      { id }: Artist,
      _args: unknown,
      { dataSources }: Context
    ): Promise<MediumTypes[]> => dataSources.Artist.getArtistMediumTypes(id),
  },
}

export default typeDef
