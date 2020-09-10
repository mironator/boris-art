import _ from 'lodash'
import { RESTDataSource } from 'apollo-datasource-rest'

import { ArtistEntity, MediumType } from '@interfaces/index'
import Artist from '@models/Artist'

type ArtistListInput = {
  query: string
  limit: number
  offset: number
}

type ArtistResponse = {
  payload: {
    artist: ArtistEntity[]
  }
}

export default class ArtistDS extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.API_BASE_URL
  }

  async getArtist(id: number): Promise<Artist> {
    // console.log('[INFO] ArtistDS.getArtist')
    const data = await this.get<ArtistResponse>(`/artist/${id}`)
    const artistEntity = _.get(data, 'artist[0]') as ArtistEntity

    return Artist.fromEntity(artistEntity)
  }

  async getArtists({ query = '', limit = 10, offset = 0 }: ArtistListInput): Promise<Artist[]> {
    // console.log('[INFO] ArtistDS.getArtists')
    const data = await this.get<ArtistResponse>(
      `/artist/?name[ilike]=${query}&limit=${limit}&offset=${offset}&sort=-lots_count`
    )
    const sampleUserData = _.get(data, 'payload.artist')

    return sampleUserData.map((d: ArtistEntity) => Artist.fromEntity(d))
  }

  async getArtistMediumTypes(id: number): Promise<MediumType[]> {
    // console.log('[INFO] ArtistDS.getArtistMediumTypes')
    const data = await this.get(`artist-medium-list?artist_id[eq]=${id}`)
    const mediumList = _.get(data, 'payload.artist_medium_list')?.map(
      (item: { medium: MediumType }) => item.medium
    ) as MediumType[]

    return mediumList || []
  }
}
