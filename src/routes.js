const express = require('express');
const DevController = require('./controllers/DevController.js');
const LikeController = require('./controllers/LikeController.js');
const DislikeController = require('./controllers/DislikeController.js');

const routes = express.Router();

routes.post('/devs', DevController.store );
routes.post('/devs/:devId/likes', LikeController.store );
routes.post('/devs/:devId/deslikes', DislikeController.store );
routes.get('/devs', DevController.index );

module.exports = routes;