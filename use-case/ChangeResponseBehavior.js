const {CHANGE_RESPONSE_BEHAVIOR} = require('../misc/behaviors');

const ChangeResponseBehavior = {
    execute : function(request, response, next, behavior){
        response.setHeader('X-Proxy-Behavior', CHANGE_RESPONSE_BEHAVIOR);
        return response.status(behavior.status).json({message: 'Intercepted by change-response behavior'});
    }
}

module.exports = ChangeResponseBehavior;