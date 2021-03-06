const { createTestClient } = require("apollo-server-testing");
const { gql } = require("apollo-server");
const {
  database: { url },
} = require("../../../src/core/config/test.config");
const Quote = require("../../../src/entities/quote/quote.entity").default;
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
    phrase:
      "If you can't explain it to a six year old, you don't understand it yourself.",
    quoter: "Albert Einstein",
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
afterEach(async () => {
  await database.reset();
  await server.close();
});

it("deleteQuote Mutation use case Test", async () => {
  const { doQuotesMutation, getQuotesQuery } = await createContext();
  const { query, mutate } = createTestClient(server.apolloClient);
  const rees = await mutate({
    mutation: doQuotesMutation,
  });
  console.log("rees", rees);
  const res = await query({
    query: getQuotesQuery,
  });
  console.log("{ doQuotesMutation, getQuotesQuery } ", {
    doQuotesMutation,
    getQuotesQuery,
  });
  console.log("res", res);
  expect(res).toMatchSnapshot();
});

// un test pentru cand nu exista quote-ul
