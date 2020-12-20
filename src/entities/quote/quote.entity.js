const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  quoter: {
    type: String,
    required: true,
  },
  phrase: {
    type: String,
    required: true,
  },
});

// Create model
const Quote = mongoose.model("quote", QuoteSchema);

//Export model
module.exports = { Quote };
