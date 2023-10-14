const router = require('express').Router();
const { CreateNoteHandler,GetAllNotesHandler, GetPersonalNoteByHandler} = require('../controllers/SpaceController');

router.get('/notes', GetAllNotesHandler)
router.post('/notes', CreateNoteHandler)
router.get('/notes/:id', GetPersonalNoteByHandler)

module.exports = router;

