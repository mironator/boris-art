import _ from 'lodash'
import queryString from 'query-string'
import { gql } from 'apollo-server-micro'

import { ArtworkEntity } from '@interfaces/index'
import Artwork from '@models/Artwork'

export const typeDef = gql`
  extend type Query {
    valuation(
      artist: Int
      image: String
      medium: String
      year: Int
      height: Int
      width: Int
      depth: Int
      unit: String
    ): Valuation
  }

  type Valuation {
    artworks: [Artwork]
    sales: JSON
    values: JSON
  }
`

// type Context = {
//   dataSources: {
//     Event: EventDS
//     Artwork: ArtworkDS
//     Artist: ArtistDS
//   }
// }

export const resolvers = {
  Query: {
    valuation: async (
      _root: unknown,
      // @ts-ignore
      { artist, image, medium, year, height, width, depth, unit }
    ) => {
      const params = {
        'artist[eq]': artist,
        'image[eq]': image,
        'medium[eq]': medium !== 'all' ? medium : null,
        'year[eq]': year,
        'height[eq]': height,
        'width[eq]': width,
        'depth[eq]': depth,
        'unit[eq]': unit,
      }

      // console.log(
      //   '[INFO] looking for similarities',
      //   params,
      //   `http://54.156.225.113:8000/v1/valuation/?${queryString.stringify(
      //     _.omitBy(params, (i) => !i)
      //   )}`
      // )
      const apiRes = await fetch(
        `http://54.156.225.113:8000/v1/valuation/?${queryString.stringify(
          _.omitBy(params, (i) => !i)
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
}

export default typeDef
