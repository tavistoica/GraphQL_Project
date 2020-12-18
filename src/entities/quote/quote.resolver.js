const { generateID } = require("../../core/helpers/generate-id.helper");
const Quote = require("./quote.entity");
const { QuoteNotExistsError } = require("./errors/quote-not-exists.error");

module.exports = {
  Query: {
    quotes: async () => await Quote.find({}),
    quotesByquoter: async (_, { quoter }) => {
      const result = await Quote.find({ quoter });
      return result;
    },
  },
  Mutation: {
    addQuote: async (_, { input }) => {
      const quote = new Quote({
        id: generateID(),
        phrase: input.phrase,
        quoter: input.quoter,
      });
      await quote.save();
      return quote;
    },
    deleteQuote: async (_, { id }) => {
      const quote = await Quote.findOne({ id });
      if (!quote) throw new QuoteNotExistsError(id);
      await quote.delete();
      return quote;
    },
    editQuote: async (_, { id, input }) => {
      const quote = await Quote.findOne({ id });
      if (!quote) throw new QuoteNotExistsError(id);
      input.phrase && (currentQuote.phrase = input.phrase);
      input.quoter && (currentQuote.quoter = input.quoter);
      return quote.save();
    },
  },
};
