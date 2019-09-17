"use strict";

const BaseExceptionHandler = use("BaseExceptionHandler");
const sentry = use("Sentry");
const _ = require("lodash");
const Env = use("Env");
const excludedExceptions = [
  "InvalidBasicAuthExceptionapp",
  "ValidationException",
  "InvalidSessionException",
  "InvalidJwtToken",
  "ExpiredJwtToken",
  "HttpException"
];
/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { response, session }) {
    // console.log(error.message)
    return super.handle(...arguments);
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {
    if (Env.get("NODE_ENV") === "production") {
      if (excludedExceptions.indexOf(_.get(error, "name", null)) === -1) {
        console.log(error);
        sentry.captureException(error);
      }
    } else {
      console.log(error);
    }
  }
}

module.exports = ExceptionHandler;
