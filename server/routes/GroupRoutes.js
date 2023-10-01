const router = require('express').Router();
const { CreateGroupHandler,GetAllGroupsHandler,GetGroupByIdHandler} = require('../controllers/GroupController');

router.get('/', GetAllGroupsHandler);
router.post('/', CreateGroupHandler);
router.get('/:id', GetGroupByIdHandler);

module.exports = router;