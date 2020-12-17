const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const mongoose = require("mongoose");
const { mongoURL } = require("./config");

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
