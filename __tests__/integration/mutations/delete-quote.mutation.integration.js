const { createTestClient } = require("apollo-server-testing");
const { gql } = require("apollo-server");
const {
  database: { url },
} = require("../../../src/core/config/test.config");
const { Quote } = require("../../../src/entities/quote/quote.entity").default;
const { Server } = require("../../../src/bootstrap/server.bootstrap");
const { Database } = require("../../../src/bootstrap/database.bootstrap");

const server = new Server();
const database = new Database();

const quoteID = "123";

function getMutationCorrect() {
  return gql`
    mutation DeleteQuotes {
      deleteQuote(id: "123") {
        id
      }
    }
  `;
}

function getMutationNonExistentId() {
  return gql`
    mutation DeleteQuotes {
      deleteQuote(id: "456") {
        id
      }
    }
  `;
}

function createQuote(quote) {
  const newQuote = new Quote(quote);
  return newQuote.save();
}

async function createContext() {
  await createQuote({
    id: quoteID,
    phrase:
      "If you can't explain it to a six year old, you don't understand it yourself.",
    quoter: "Albert Einstein",
  });
  return {
    mutationCorrect: getMutationCorrect(),
    mutationNonExistentId: getMutationNonExistentId(),
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

it("deletes a quote", async () => {
  const { mutationCorrect } = await createContext();
  const { mutate } = createTestClient(server.apolloClient);
  const res = await mutate({
    mutation: mutationCorrect,
  });
  expect(res).toMatchSnapshot();
});

it("checks the delete behavior when quote does not exist", async () => {
  const { mutationNonExistentId } = await createContext();
  const { mutate } = createTestClient(server.apolloClient);
  const res = await mutate({
    mutation: mutationNonExistentId,
  });
  expect(res).toMatchSnapshot();
});
