const GenericError = require('./GenericError');
const httpStatusCodes = require('../misc/httpStatusCodes');

class BehaviorAlreadyExistsError extends GenericError {
  constructor() {
    super(`Behavior already exists`);
    this.data = { status: httpStatusCodes.CONFLICT };
  }
}

module.exports = BehaviorAlreadyExistsError;