const { generateID } = require("../../core/helpers/generate-id.helper");
const { Quote } = require("./quote.entity").default;
const { QuoteNotExistsError } = require("./errors/quote-not-exists.error");

module.exports = {
  Query: {
    quotes: () => Quote.find({}),
    quotesByQuoter: (_, { quoter }) => Quote.find({ quoter }),
  },
  Mutation: {
    addQuote: async (_, { input }) => {
      const quote = new Quote({
        id: generateID(),
        phrase: input.phrase,
        quoter: input.quoter,
      });
      return quote.save();
    },
    deleteQuote: async (_, { id }) => {
      const quote = await Quote.findOne({ id });
      if (!quote) throw new QuoteNotExistsError(id);
      return quote.delete();
    },
    editQuote: async (_, { id, input }) => {
      const quote = await Quote.findOne({ id });
      if (!quote) throw new QuoteNotExistsError(id);
      input.phrase && (quote.phrase = input.phrase);
      input.quoter && (quote.quoter = input.quoter);
      return quote.save();
    },
  },
};
