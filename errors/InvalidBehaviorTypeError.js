const GenericError = require('./GenericError');
const httpStatusCodes = require('../misc/httpStatusCodes');

class InvalidBehaviorTypeError extends GenericError {
  constructor(type) {
    super(`${type} is not a valid behavior type`);
    this.data = { status: httpStatusCodes.UNPROCESSABLE_ENTITY };
  }
}

module.exports = InvalidBehaviorTypeError;