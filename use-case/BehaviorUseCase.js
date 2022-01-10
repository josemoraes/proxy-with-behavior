
const ChangeResponseBehavior = require('./ChangeResponseBehavior');
const LatencyBehavior = require('./LatencyBehavior');
const {CHANGE_RESPONSE_BEHAVIOR, LATENCY_BEHAVIOR} = require('../misc/behaviors');

const behaviorsStrategy = {};
behaviorsStrategy[CHANGE_RESPONSE_BEHAVIOR] = ChangeResponseBehavior;
behaviorsStrategy[LATENCY_BEHAVIOR] = LatencyBehavior;

const BehaviorUseCase = {
    execute : function(request, response, next, behavior){
        return behaviorsStrategy[behavior.type].execute(request, response, next, behavior);
    }
}

module.exports = BehaviorUseCase;