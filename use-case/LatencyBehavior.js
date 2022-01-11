const {LATENCY_BEHAVIOR, DEFAULT_PATTERN_FLAG} = require('../misc/behaviors');
const DEFAULT_LATENCY_IN_MILLISECONDS = 2000;

const LatencyBehavior = {
    execute: function (request, response, next, behavior){
        response.setHeader('X-Proxy-Behavior', LATENCY_BEHAVIOR);
        let regexPattern = behavior.pattern_source
            ? new RegExp(behavior.pattern_source, behavior.pattern_flag || DEFAULT_PATTERN_FLAG)
            : null;
        const timeout = !isNaN(behavior.data) ? +behavior.data : DEFAULT_LATENCY_IN_MILLISECONDS; 
        let bodyStringfied = JSON.stringify(request.body);

        if(!regexPattern || bodyStringfied.match(regexPattern)){
            setTimeout(()=>{
                next();
            }, timeout);
            return;
        }

        next();
    }
}

module.exports = LatencyBehavior;