const express = require('express');
const viewController = require('../controllers/viewController');

const viewRouter = express.Router();

viewRouter.get('/', viewController.index);
viewRouter.get('/email', viewController.email);

module.exports = viewRouter;
