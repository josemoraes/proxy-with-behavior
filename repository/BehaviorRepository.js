const _behaviors = require('../misc/behaviors');
const Behavior = require('../models/Behavior');
const BehaviorAlreadyExistsError = require('../errors/BehaviorAlreadyExistsError');
const BehaviorNotFoundError = require('../errors/BehaviorNotFoundError');
const InvalidBehaviorTypeError = require('../errors/InvalidBehaviorTypeError');

const BehaviorRepository = {
    list: async function () {
        return await Behavior.findAll();
    },
    store: async function (behavior) {
        if (!Object.values(_behaviors).some(type => type === behavior.type)) {
            throw new InvalidBehaviorTypeError(behavior.type);
        }

        const foundBehavior = await Behavior.findOne({
            where: {
                resource: behavior.resource,
                method: behavior.method
            }
        });

        if (foundBehavior) {
                throw new BehaviorAlreadyExistsError();
        }
        
        await Behavior.create({
            resource: behavior.resource,
            type: behavior.type,
            method: behavior.method,
            status: behavior.status || 0,
            data: behavior.data,
            active: true
        });
    },
    delete: async function (behaviorId) {
        const behavior = await Behavior.findByPk(behaviorId);

        if(!behavior){
            throw new BehaviorNotFoundError();
        }

        if (!Object.values(_behaviors).some(type => type === behavior.type)) {
            throw new InvalidBehaviorTypeError(behavior.type);
        }

        await behavior.destroy();
    },
    toggleActive: async function (behaviorId) {
        const behavior = await Behavior.findByPk(behaviorId);

        if(!behavior){
            throw new BehaviorNotFoundError();
        }

        if (!Object.values(_behaviors).some(type => type === behavior.type)) {
            throw new InvalidBehaviorTypeError(behavior.type);
        }

        await behavior.update({active: !behavior.active});
    },
    findByResourceAndMethod: async function(resource, method){
        return await Behavior.findOne({
            where: {
                resource,
                method
            }
        })
    }
};

module.exports = BehaviorRepository;