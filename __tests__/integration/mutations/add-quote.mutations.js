const { createTestClient } = require("apollo-server-testing");
const { gql } = require("apollo-server");
const {
  database: { url },
} = require("../../../src/core/config/test.config");
const { Server } = require("../../../src/bootstrap/server.bootstrap");
const { Database } = require("../../../src/bootstrap/database.bootstrap");

const server = new Server();
const database = new Database();

function doMutation() {
  return gql`
    mutation AddQuotes {
      addQuote(input: { phrase: "smenarie", quoter: "mafiotu" }) {
        id
        phrase
      }
    }
  `;
}

function getQuery() {
  return gql`
    query getQuotes {
      quotes {
        quoter
        phrase
      }
    }
  `;
}

async function createContext() {
  return {
    doQuotesMutation: doMutation(),
    getQuotesQuery: getQuery(),
  };
}

beforeEach(async () => {
  await database.bootstrap({ url });
  server.bootstrap();
});
afterEach(() => database.reset());

it("addQuote Mutation use case Test", async () => {
  const { doQuotesMutation, getQuotesQuery } = await createContext();
  const { query, mutate } = createTestClient(server.apolloClient);
  await mutate({
    mutation: doQuotesMutation,
  });
  const res = await query({
    query: getQuotesQuery,
  });
  expect(res).toMatchSnapshot();
});
