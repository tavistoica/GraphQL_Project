const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const quoteResolver = require("../entities/quote/quote.resolver");
const quoteType = require("../entities/quote/quote");

const types = [quoteType];
const resolvers = [quoteResolver];

module.exports = {
  typeDefs: mergeTypeDefs(types),
  resolvers: mergeResolvers(resolvers),
};
