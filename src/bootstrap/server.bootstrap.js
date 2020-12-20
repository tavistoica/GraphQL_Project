const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { readFileSync } = require("fs");

const quoteResolver = require("../entities/quote/quote.resolver");
const { ApolloServer } = require("apollo-server");

const resolvers = [quoteResolver];
const quoteTypeDef = readFileSync(
  process.cwd() + "/src/entities/quote/quote.graphql",
  "utf8"
);
const typeDefs = [quoteTypeDef];

class Server {
  bootstrap() {
    this.apolloClient = new ApolloServer({
      typeDefs: mergeTypeDefs(typeDefs),
      resolvers: mergeResolvers(resolvers),
    });
  }

  async close() {
    await this.apolloClient.stop();
  }
}

module.exports = { Server };
