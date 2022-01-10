const {LATENCY_BEHAVIOR} = require('../misc/behaviors');
const DEFAULT_LATENCY_IN_MILLISECONDS = 2000;

const LatencyBehavior = {
    execute: function (request, response, next, behavior){
        response.setHeader('X-Proxy-Behavior', LATENCY_BEHAVIOR);
        const timeout = !isNaN(behavior.data) ? +behavior.data : DEFAULT_LATENCY_IN_MILLISECONDS; 
        setTimeout(()=>{
            next();
        }, timeout);
    }
}

module.exports = LatencyBehavior;