const routes = require('express').Router();
const { GetAllNotificationsHandler,NotificationReadHandler} = require('../controllers/NotificationController');

routes.get('/', GetAllNotificationsHandler);
routes.post('/read/:id', NotificationReadHandler);

module.exports = routes;
