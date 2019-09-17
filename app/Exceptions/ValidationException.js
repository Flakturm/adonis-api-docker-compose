
"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class ValidationException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  async handle(error, { response }) {
    return response.status(422).send({ messages: error.message.messages})
  }
}

module.exports = ValidationException;
