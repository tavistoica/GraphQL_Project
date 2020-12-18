const { createTestClient } = require("apollo-server-testing");
const { gql } = require("apollo-server");
const {
  database: { url },
} = require("../../../src/core/config/test.config");
const Quote = require("../../../src/entities/quote/quote.entity");
const { Server } = require("../../../src/bootstrap/server.bootstrap");
const { Database } = require("../../../src/bootstrap/database.bootstrap");
const { generateID } = require("../../../src/core/helpers/generate-id.helper");

const server = new Server();
const database = new Database();

function getQuery() {
  return gql`
    query getQuotesByQuoter {
      quotesByquoter(quoter: "mafiotu") {
        phrase
      }
    }
  `;
}

async function createContext() {
  const quote = await createQuote({
    id: generateID,
    phrase: "O vorba mare",
    quoter: "mafiotu",
  });
  return {
    getQuotesQuery: getQuery(),
    quote,
  };
}

function createQuote(quote) {
  const newQuote = new Quote(quote);
  return newQuote.save();
}

beforeEach(async () => {
  await database.bootstrap({ url });
  server.bootstrap();
});
afterEach(() => database.reset());

it("quotesByquoter Query use case Test", async () => {
  const { getQuotesQuery } = await createContext();
  const { query } = createTestClient(server.apolloClient);
  const res = await query({
    query: getQuotesQuery,
  });
  expect(res).toMatchSnapshot();
});
