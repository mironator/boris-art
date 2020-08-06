import _ from 'lodash'
import { DateResolver } from 'graphql-scalars'
import Artist from '@models/Artist'
import Event, { EventEntity } from '@models/Event'
import { ArtistEntity, ArtworkEntity } from '@interfaces/index'
import Artwork from '@models/Artwork'

const resolvers = {
  Date: DateResolver,
  Query: {
    artists: async (
      _root: unknown,
      { query = '', limit = 10, offset = 0 }: { query: string; limit: number; offset: number }
    ): Promise<Artist[]> => {
      const apiRes = await fetch(
        `http://54.156.225.113:8000/v1/artist/?name[ilike]=${query}&limit=${limit}&offset=${offset}&sort=-lots_count`
      )
      const data = await apiRes.json()
      const {
        payload: { artist: sampleUserData },
      } = data

      return sampleUserData.map((d: ArtistEntity) => Artist.fromEntity(d))
    },
    artist: async (_root: unknown, { id }: { id: number }): Promise<Artist> => {
      const apiRes = await fetch(`http://54.156.225.113:8000/v1/artist/${id}`)
      const data = await apiRes.json()
      const artistEntity = _.get(data, 'artist[0]') as ArtistEntity

      return Artist.fromEntity(artistEntity)
    },
    events: async (_root: unknown, { artistId }: { artistId: number }): Promise<Event> => {
      const apiRes = await fetch(`http://54.156.225.113:8000/v1/event/?artist_id[eq]=${artistId}`)
      const data = await apiRes.json()
      const {
        payload: { event: eventData },
      } = data

      return eventData.map((entity: EventEntity) => Event.fromEntity(entity))
    },
  },
  Event: {
    artist: async (_root: unknown, { artistId }: Event): Promise<Artist | null> => {
      const apiRes = await fetch(`http://54.156.225.113:8000/v1/artist/${artistId}`)
      const data = await apiRes.json()
      const entity = _.get(data, 'artist[0]') as ArtistEntity

      return entity ? Artist.fromEntity(artistEntity) : null
    },
    artwork: async (_root: unknown, { artworkId }: Event): Promise<Artwork | null> => {
      const apiRes = await fetch(`http://54.156.225.113:8000/v1/artwork/${artworkId}`)
      const data = await apiRes.json()
      const entity = _.get(data, 'artwork[0]') as ArtworkEntity

      return entity ? Artwork.fromEntity(entity) : null
    },
  },
}

export default resolvers
