const Validate = use("Validator");
const _ = require("lodash");
const ValidationException = use("App/Exceptions/ValidationException");

const ValidateFn = async (antl, data, rules, messages = {}, attributes = {}) => {
  messages = Object.assign(
    {},
    antl.list("validation"),
    messages
  );
  attributes = Object.assign(
    {},
    antl.list("attributes"),
    attributes
  );
  messages = _.mapValues(messages, message => {
    return (field, validation, args) => {
      return message
        .replace("{{field}}", _.get(attributes, field, _.upperFirst(field)))
        .replace("{{argument.0}}", _.get(attributes, args[0], args[0]))
        .replace("{{argument.1}}", _.get(attributes, args[1], args[1]));
    };
  });
  const validation = await Validate.validateAll(data, rules, messages);
  if (validation.fails()) {
    ValidationError(validation.messages())
    return false
  }
  return true;
};

const ValidationError = (messages) => {
  if (_.isString(messages)){
    messages = [{ message: messages}]
  }
  throw new ValidationException({ messages: messages }, 422);

}
module.exports = {
  Validate: ValidateFn,
  ValidationError
};
