const { Server } = require("../bootstrap/server.bootstrap");
const { Database } = require("../bootstrap/database.bootstrap");
const { port } = require("../core/config/dev.config");

async function start() {
  const database = new Database();
  const server = new Server();
  await database.bootstrap();
  server.bootstrap();
  await server.apolloClient.listen(port);
  console.log(`> Server ready`);
}

start().then(() => {});
