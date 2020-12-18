const { createTestClient } = require("apollo-server-testing");
const { gql } = require("apollo-server");
const {
  database: { url },
} = require("../../../src/core/config/test.config");
const Quote = require("../../../src/entities/quote/quote.entity");
const { generateID } = require("../../../src/core/helpers/generate-id.helper");
const { Server } = require("../../../src/bootstrap/server.bootstrap");
const { Database } = require("../../../src/bootstrap/database.bootstrap");

const server = new Server();
const database = new Database();

const quoteID = "123";

function doMutation() {
  return gql`
    mutation DeleteQuotes {
      deleteQuote(id: quoteID) {
        id
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

function createQuote(quote) {
  const newQuote = new Quote(quote);
  return newQuote.save();
}

async function createContext() {
  const quote = await createQuote({
    id: quoteID,
    phrase: "O vorba mare",
    quoter: "mafiotu",
  });
  return {
    doQuotesMutation: doMutation(),
    getQuotesQuery: getQuery(),
    quote,
  };
}

beforeEach(async () => {
  await database.bootstrap({ url });
  server.bootstrap();
});
afterEach(() => database.reset());

it("deleteQuote Mutation use case Test", async () => {
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
