const { ApolloServer } = require("apollo-server");
const entity = require("./src/entities");
const mongoose = require("mongoose");
const { mongoURL } = require("./src/core/config");

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

const server = new ApolloServer(entity);

server.listen().then(({ url }) => {
  console.log(`> Server ready at ${url}`);
});
