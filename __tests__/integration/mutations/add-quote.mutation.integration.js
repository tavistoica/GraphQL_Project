const { createTestClient } = require("apollo-server-testing");
const { gql } = require("apollo-server");
const {
  database: { url },
} = require("../../../src/core/config/test.config");
const { Server } = require("../../../src/bootstrap/server.bootstrap");
const { Database } = require("../../../src/bootstrap/database.bootstrap");

const server = new Server();
const database = new Database();

function getMutation() {
  return gql`
    mutation AddQuotes {
      addQuote(
        input: {
          phrase: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe."
          quoter: "Albert Einstein"
        }
      ) {
        phrase
      }
    }
  `;
}

async function createContext() {
  return {
    mutation: getMutation(),
  };
}

beforeEach(async () => {
  await database.bootstrap({ url });
  server.bootstrap();
});
afterEach(async () => {
  await database.reset();
  await server.close();
});

it("adds a quote", async () => {
  const { mutation } = await createContext();
  const { mutate } = createTestClient(server.apolloClient);
  const response = await mutate({ mutation });
  expect(response).toMatchSnapshot();
});
