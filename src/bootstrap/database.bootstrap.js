const mongoose = require("mongoose");

const {
  database: { url },
} = require("../core/config/dev.config");

class Database {
  async bootstrap(options) {
    const databaseURL = options && options.url ? options.url : url;
    await mongoose.connect(databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async reset() {
    await mongoose.connection.db.dropDatabase();
  }
}
module.exports = { Database };
