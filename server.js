const { ApolloServer } = require("apollo-server");
const typeDefs = require("./src/graphql/schema");
const resolvers = require("./src/graphql/resolvers");
const mongoose = require("mongoose");
const { mongoURL } = require("./src/config");

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`> Server ready at ${url}`);
});
