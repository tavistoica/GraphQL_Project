const { gql } = require("apollo-server");

const quoteType = gql`
  type Quote {
    id: ID!
    phrase: String!
    quoter: String!
  }
  input QuoteAdd {
    phrase: String!
    quoter: String!
  }
  input QuoteEdit {
    phrase: String
    quoter: String
  }
  type Query {
    quotes: [Quote]!
    quotesByquoter(quoter: String!): [Quote]!
  }
  type Mutation {
    addQuote(input: QuoteAdd!): QuoteUpdateResponse!
    editQuote(id: ID!, quote: QuoteEdit!): QuoteUpdateResponse!
    deleteQuote(id: ID!): QuoteUpdateResponse!
  }
  type QuoteUpdateResponse {
    success: Boolean!
    message: String
    # quotes: [Quote]
  }
`;

module.exports = quoteType;
