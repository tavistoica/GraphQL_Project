const { ConflictError } = require("../../../core/errors/conflict.error");

class QuoteNotExistsError extends ConflictError {
  constructor(entityId) {
    super("Quote does not exist in the database.", {
      entity: {
        id: entityId,
      },
    });
  }
}
module.exports = { QuoteNotExistsError };
