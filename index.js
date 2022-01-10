require('dotenv').config();
const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const apiRoutes = require('./routes/api-routes');
const sequelize = require('./database');
const BehaviorUseCase = require('./use-case/BehaviorUseCase');
const BehaviorRepository = require('./repository/BehaviorRepository');


// Create Express Servers
const proxy = express();
const api = express();
proxy.use(express.json());
api.use(express.json());
api.use(apiRoutes);
proxy.use(morgan('dev'));


proxy.use('', async (req, res, next) => {
    const resource = req.path;
    const method = req.method;
    const behaviorFound = await BehaviorRepository.findByResourceAndMethod(resource, method);
    
    if (behaviorFound && behaviorFound.active) {
        return BehaviorUseCase.execute(req, res, next, behaviorFound);
    }

    next();
});

// Proxy endpoints
proxy.use(`/`, createProxyMiddleware({
    target: process.env.SERVICE_URL,
    changeOrigin: true
}));

proxy.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Starting Proxy at ${process.env.HOST}:${process.env.PORT}`);
});

api.listen(process.env.API_PORT, process.env.HOST, async () => {
    console.log(`Starting Proxy API at ${process.env.HOST}:${process.env.API_PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
