const Quote = require("../dbModels/quote");

module.exports = {
  quotes: async () => await Quote.find({}),
  quotesByquoter: async (_, { quoter }) => {
    const result = await Quote.find({ quoter });
    return result;
  },
};
