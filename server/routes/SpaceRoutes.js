const router = require('express').Router();
const { CreateNoteHandler,GetAllNotesHandler} = require('../controllers/SpaceController');

router.get('/notes', GetAllNotesHandler)
router.post('/notes', CreateNoteHandler)

module.exports = router;

