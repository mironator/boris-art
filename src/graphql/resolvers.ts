import _, { isEmpty } from 'lodash'
import { DateResolver } from 'graphql-scalars'
// import { GraphQLUpload } from 'graphql-upload'
import Artist from '@models/Artist'
import Event, { EventEntity } from '@models/Event'
import { ArtistEntity, ArtworkEntity } from '@interfaces/index'
import Artwork from '@models/Artwork'
import queryString from 'query-string'

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
    valuation: async (
      _root: unknown,
      // @ts-ignore
      { artist, image, medium, year, height, width, depth, unit }
    ) => {
      const params = {
        'artist[eq]': artist,
        'image[eq]': image,
        'medium[eq]': medium,
        'year[eq]': year,
        'height[eq]': height,
        'width[eq]': width,
        'depth[eq]': depth,
        'unit[eq]': unit,
      }
      const apiRes = await fetch(
        `http://54.156.225.113:8000/v1/valuation/?${queryString.stringify(
          _.omitBy(params, isEmpty)
        )}`
      )

      // const apiRes = await fetch(
      //   'http://54.156.225.113:8000/v1/valuation/?artist%5Beq%5D=3505&image%5Beq%5D=https://image.freepik.com/free-vector/head-man_1308-33466.jpg'
      // )
      const data = await apiRes.json()
      const { valuation } = data

      return {
        artworks: valuation?.artworks.map((entity: ArtworkEntity) => Artwork.fromEntity(entity)),
        sales: valuation?.sales,
        values: valuation?.values,
      }
    },
  },

  Event: {
    artist: async ({ artistId }: Event): Promise<Artist | null> => {
      const apiRes = await fetch(`http://54.156.225.113:8000/v1/artist/${artistId}`)
      const data = await apiRes.json()
      const entity = _.get(data, 'artist[0]') as ArtistEntity

      return entity ? Artist.fromEntity(entity) : null
    },
    artwork: async ({ artworkId }: Event): Promise<Artwork | null> => {
      const apiRes = await fetch(`http://54.156.225.113:8000/v1/artwork/${artworkId}`)
      const data = await apiRes.json()
      const entity = _.get(data, 'artwork[0]') as ArtworkEntity

      return entity ? Artwork.fromEntity(entity) : null
    },
  },
}

export default resolvers
