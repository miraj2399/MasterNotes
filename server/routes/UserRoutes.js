const router = require('express').Router();
const User = require('../models/UserModel');
const { SignUpHandler, LoginHandler } = require('../controllers/UserController');

router.post('/signup', SignUpHandler);
router.post('/login', LoginHandler);

module.exports = router;