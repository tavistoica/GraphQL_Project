const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { ApolloServer } = require("apollo-server");

const quoteResolver = require("../entities/quote/quote.resolver");
const quoteType = require("../entities/quote/quote.typedef");

const resolvers = [quoteResolver];
const types = [quoteType];

class Server {
  bootstrap() {
    this.apolloClient = new ApolloServer({
      typeDefs: mergeTypeDefs(types),
      resolvers: mergeResolvers(resolvers),
    });
  }
}

module.exports = { Server };
