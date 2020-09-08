import { ApolloServer } from 'apollo-server-micro'

import typeDefs from '@graphql/schema'
import resolvers from '@graphql/resolvers'
import Artist from '@graphql/data-source/artist'
import Event from '@graphql/data-source/event'
import Artwork from '@graphql/data-source/artwork'
import Regression from '@graphql/data-source/regression'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    Artist: new Artist(),
    Event: new Event(),
    Artwork: new Artwork(),
    Regression: new Regression(),
  }),
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
