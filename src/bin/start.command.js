const { Server } = require("../bootstrap/server.bootstrap");
const { Database } = require("../bootstrap/database.bootstrap");

async function start() {
  const database = new Database();
  const server = new Server();
  await database.bootstrap();
  server.bootstrap();
  await server.apolloClient.listen();
  console.log(`> Server ready`);
}

start().then(() => {});
