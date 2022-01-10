const GenericError = require('./GenericError');
const httpStatusCodes = require('../misc/httpStatusCodes');

class BehaviorNotFoundError extends GenericError {
  constructor() {
    super(`Behavior not found`);
    this.data = { status: httpStatusCodes.NOT_FOUND };
  }
}

module.exports = BehaviorNotFoundError;