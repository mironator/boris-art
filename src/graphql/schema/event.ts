import { gql } from 'apollo-server-micro'

import EventDS from '@graphql/data-source/event'
import ArtworkDS from '@graphql/data-source/artwork'
import ArtistDS from '@graphql/data-source/artist'
import Event from '@models/Event'
import { Artist, Artwork } from '@interfaces/index'

export const typeDef = gql`
  extend type Query {
    events(artistId: Int, limit: Int, offset: Int): [Event]
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
`

type Context = {
  dataSources: {
    Event: EventDS
    Artwork: ArtworkDS
    Artist: ArtistDS
  }
}

export const resolvers = {
  Query: {
    events: async (
      _root: unknown,
      { artistId }: { artistId: number },
      { dataSources }: Context
    ): Promise<Event[]> => dataSources.Event.getEvents(artistId),
  },

  Event: {
    artist: async (
      { artistId }: Event,
      _args: unknown,
      { dataSources }: Context
    ): Promise<Artist | null> => dataSources.Artist.getArtist(artistId),
    artwork: async (
      { artworkId }: Event,
      _args: unknown,
      { dataSources }: Context
    ): Promise<Artwork | null> => dataSources.Artwork.getArtwork(artworkId),
  },
}

export default typeDef
