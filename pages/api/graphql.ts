import { ApolloServer } from 'apollo-server-micro'

import typeDefs from '@graphql/data-source/schema'
import resolvers from '@graphql/resolvers'
import Artist from '@graphql/data-source/artist'
import Event from '@graphql/data-source/event'
import Artwork from '@graphql/data-source/artwork'
import Regression from '@graphql/data-source/regression'
import Lot from '@graphql/data-source/lot'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    Artist: new Artist(),
    Event: new Event(),
    Artwork: new Artwork(),
    Regression: new Regression(),
    Lot: new Lot(),
  }),
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
