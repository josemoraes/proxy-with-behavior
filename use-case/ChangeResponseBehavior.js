const { CHANGE_RESPONSE_BEHAVIOR } = require('../misc/behaviors');
const httpStatusCodes = require('../misc/httpStatusCodes');
const {DEFAULT_PATTERN_FLAG} = require('../misc/behaviors');

const ChangeResponseBehavior = {
    execute: function (request, response, next, behavior) {
        response.setHeader('X-Proxy-Behavior', CHANGE_RESPONSE_BEHAVIOR);
        let regexPattern = behavior.pattern_source
            ? new RegExp(behavior.pattern_source, behavior.pattern_flag || DEFAULT_PATTERN_FLAG)
            : null;

        let bodyStringfied = JSON.stringify(request.body);

        if (!regexPattern || bodyStringfied.match(regexPattern)) {
            return response.status(behavior.status || httpStatusCodes.SUCCESS).json({ message: 'Intercepted by change-response behavior' });
        }

        next();
    }
}

module.exports = ChangeResponseBehavior;