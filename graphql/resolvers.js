const { quotes, quotesByquoter } = require("../controllers/queries");
const {
  addQuote,
  deleteQuote,
  editQuote,
} = require("../controllers/mutations");

module.exports = {
  Query: {
    quotes,
    quotesByquoter,
  },
  Mutation: {
    addQuote,
    deleteQuote,
    editQuote,
  },
};
