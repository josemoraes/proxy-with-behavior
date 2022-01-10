const BehaviorRepository = require('../repository/BehaviorRepository');
const httpStatusCodes = require('../misc/httpStatusCodes');

module.exports = {
    list: async (req, res, next) => {
        return res.status(httpStatusCodes.SUCCESS).json({ behaviors: await BehaviorRepository.list() });
    },
    store: async (req, res, next) => {
        try {
            await BehaviorRepository.store(req.body);
            return res.status(httpStatusCodes.CREATED).json({ behaviors: await BehaviorRepository.list() });
        } catch (error) {
            return res.status(error.data.status || httpStatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    },
    update: async (req, res, next)=>{
        try {
            await BehaviorRepository.toggleActive(req.params.id);
            return res.status(httpStatusCodes.SUCCESS).json({ behaviors: await BehaviorRepository.list() });
        } catch (error) {
            return res.status(error.data.status || httpStatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    },
    delete: async (req, res, next) => {
        try {
            await BehaviorRepository.delete(req.params.id);
            return res.status(httpStatusCodes.SUCCESS).json({ behaviors: await BehaviorRepository.list() });
        } catch (error) {
            return res.status(error.data.status || httpStatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }
};