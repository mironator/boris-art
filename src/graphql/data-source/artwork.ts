import _ from 'lodash'
import moment from 'moment'
import { RESTDataSource } from 'apollo-datasource-rest'
import queryString from 'query-string'

import Artwork from '@models/Artwork'
import { ArtworkEntity, MediumType } from '@interfaces/index'
import SortTypes from '@models/SortTypes'

type ArtworkResponse = {
  payload: {
    artwork: ArtworkEntity[]
  }
}

const getSort = (sort: SortTypes): string => {
  if (sort === SortTypes.featured || !sort) return ''

  return `&sort=${sort}`
}

const getMedium = (medium: MediumType): string => {
  if (medium === MediumType.all || !medium) return ''

  return `&medium_final[eq]=${medium}`
}

export default class ArtowrkDS extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.API_BASE_URL
  }

  async getArtwork(id: number): Promise<Artwork | null> {
    if (!id) {
      return null
    }
    const data = await this.get<ArtworkResponse>(`/artwork/${id}`)
    const entity = _.get(data, 'artwork[0]') as ArtworkEntity

    return Artwork.fromEntity(entity)
  }

  async getArtworksOfArtist({
    artistId,
    offset = 0,
    limit = 10,
    sort,
    medium,
    priceSoldFrom,
    priceSoldTo,
    dateSoldFrom,
    dateSoldTo,
  }: {
    artistId: number
    offset: number
    limit: number
    sort: SortTypes
    medium: MediumType
    priceSoldFrom: number
    priceSoldTo: number
    dateSoldFrom: Date
    dateSoldTo: Date
  }): Promise<Artwork[]> {
    const url = `/artwork/?${queryString.stringify(
      _.omitBy(
        {
          'artist_id[eq]': artistId,
          offset,
          limit,
          sort,
          medium,
          'lot_image_presigned_url[empty]': false,
          'last_price[gte]': priceSoldFrom,
          'last_price[lte]': priceSoldTo,
          'date_last_sold[gte]': dateSoldFrom && moment(dateSoldFrom).format(),
          'date_last_sold[lte]': dateSoldTo && moment(dateSoldTo).format(),
        },
        _.isNil
      )
    )}${getSort(sort)}${getMedium(medium)}`

    // console.log('[INFO] getArtworksOfArtist', url)
    const data = await this.get(url)

    const artworks: Artwork[] = _.get(data, 'payload.artwork', []).map((entity: ArtworkEntity) =>
      Artwork.fromEntity(entity)
    )

    return artworks
  }
}
