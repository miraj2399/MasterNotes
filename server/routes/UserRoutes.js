const router = require('express').Router();
const { SignUpHandler, LoginHandler,AuthenticatedHandler } = require('../controllers/UserController');

router.post('/signup', SignUpHandler);
router.post('/login', LoginHandler);
router.get("/authenticated", AuthenticatedHandler);

module.exports = router;