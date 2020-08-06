import { ApolloServer, gql } from 'apollo-server-micro'
import { DateResolver } from 'graphql-scalars'

import Artist from '@models/Artist'
import { ArtistEntity } from '@interfaces/index'

const typeDefs = gql`
  scalar Date

  type Query {
    users: [User!]!
    artists(query: String, limit: Int, offset: Int): [Artist!]!
  }
  type User {
    id: Int!
    firstName: String
  }
  "Artist object containing basis scalar fields"
  type Artist {
    id: Int!
    name: String
    birth: Date
    death: Date
    qualifier: String
    lotsCost: Int
    artworksCount: Int
    lotsCount: Int
  }
`

const resolvers = {
  Date: DateResolver,
  Query: {
    users(/* parent, args, context */) {
      return [{ id: 0, firstName: 'Nextjs' }]
    },
    // @ts-ignore
    artists: async (_, { query = '', limit = 10, offset = 0 }) => {
      const apiRes = await fetch(
        `http://54.156.225.113:8000/v1/artist/?name[ilike]=${query}&limit=${limit}&offset=${offset}&sort=-lots_count`
      )
      const data = await apiRes.json()
      const {
        payload: { artist: sampleUserData },
      } = data

      return sampleUserData.map((d: ArtistEntity) => Artist.fromEntity(d))
    },
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
