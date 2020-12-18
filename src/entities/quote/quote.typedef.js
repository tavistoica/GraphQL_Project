module.exports = `type Quote {
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
  addQuote(input: QuoteAdd!): Quote!
  editQuote(id: ID!, quote: QuoteEdit!): Quote
  deleteQuote(id: ID!): Quote
}`;
