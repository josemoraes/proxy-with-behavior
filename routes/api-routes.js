const express = require('express');
const BehaviorsController = require('../controllers/BehaviorsController');

const apiRoutes = express.Router();

apiRoutes.get('/behaviors', BehaviorsController.list);

apiRoutes.post('/behaviors', BehaviorsController.store);

apiRoutes.put('/behaviors/:id/toggle', BehaviorsController.update);

apiRoutes.delete('/behaviors/:id', BehaviorsController.delete);

module.exports = apiRoutes;