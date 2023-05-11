const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authController = require('../controllers/authController');

const dashboardRoutes = express.Router();

dashboardRoutes.use(authController.protect, authController.restrictTo('admin'));
dashboardRoutes.route('/').get(dashboardController.get);

module.exports = dashboardRoutes;
