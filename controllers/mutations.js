const { generateID } = require("../utils");
const Quote = require("../dbModels/quote");
const { quoteResponse } = require("../utils");

module.exports = {
  addQuote: async (_, { quote }) => {
    const generatedID = generateID();
    const isIdTaken = await Quote.findOne({ id: generatedID });
    if (isIdTaken)
      return quoteResponse(
        false,
        "The quote appears to exist already in the database."
      );
    const newQuote = new Quote({
      id: generatedID,
      phrase: quote.phrase,
      quoter: quote.quoter,
    });
    try {
      await newQuote.save();
    } catch (e) {
      return quoteResponse(false, e);
    }
    return quoteResponse(true, "success");
  },
  deleteQuote: async (_, { id }) => {
    const doesQuoteExist = await Quote.findOne({ id });
    if (!doesQuoteExist)
      return quoteResponse(
        false,
        "The quote with the specified ID does not exist in the database."
      );
    try {
      await Quote.deleteOne({ id });
    } catch (e) {
      return quoteResponse(false, e);
    }
    return quoteResponse(true, "success");
  },
  editQuote: async (_, { id, quote }) => {
    const currentQuote = await Quote.findOne({ id });
    if (!currentQuote)
      return quoteResponse(false, "Quote does not exist in the database.");
    quote.phrase && (currentQuote.phrase = quote.phrase);
    quote.quoter && (currentQuote.quoter = quote.quoter);
    try {
      await currentQuote.save();
    } catch (e) {
      return quoteResponse(false, e);
    }
    return quoteResponse(true, "success");
  },
};
