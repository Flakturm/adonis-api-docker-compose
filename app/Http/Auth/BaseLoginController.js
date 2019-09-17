"use strict";
const { Validate, ValidationError } = use("App/Services/ValidationService");

class BaseLoginController {
  async login({ request, antl, auth }) {
    await Validate(antl, request.all(), {
      email: "required",
      password: "required"
    });
    try {
      const { email, password } = request.all()
      await auth.attempt(email, password)
    } catch (e) {
      ValidationError(antl.formatMessage("errors.unknownError"));
    }
  }
  async logout({ auth, response }) {
    await auth.logout();
    return response.send({ message: "success" });
  }
}

module.exports = BaseLoginController;
