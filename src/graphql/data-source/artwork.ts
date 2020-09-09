import _ from 'lodash'
import { RESTDataSource } from 'apollo-datasource-rest'

import Artwork from '@models/Artwork'
import { ArtworkEntity } from '@interfaces/index'

type ArtworkResponse = {
  payload: {
    artwork: ArtworkEntity[]
  }
}

export default class ArtowrkDS extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.API_BASE_URL
  }

  async getArtwork(id: number): Promise<Artwork> {
    const data = await this.get<ArtworkResponse>(`/artwork/${id}`)
    const entity = _.get(data, 'artwork[0]') as ArtworkEntity

    return Artwork.fromEntity(entity)
  }
}
