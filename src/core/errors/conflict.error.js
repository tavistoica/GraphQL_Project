const { GraphQLError } = require("graphql");

class ConflictError extends GraphQLError {
  constructor(message, extensions) {
    super(message, undefined, undefined, undefined, undefined, undefined, {
      code: "CONFLICT",
      ...extensions,
    });
  }
}

module.exports = { ConflictError };
