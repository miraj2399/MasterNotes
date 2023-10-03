const routes = require('express').Router();
const { GetAllNotificationsHandler} = require('../controllers/NotificationController');

routes.get('/', GetAllNotificationsHandler);

module.exports = routes;
