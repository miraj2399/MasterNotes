const router = require('express').Router();
const { CreateNoteHandler,GetAllNotesHandler, GetPersonalNoteByHandler,EditNoteHandler,DeleteNoteHandler} = require('../controllers/SpaceController');

router.get('/notes', GetAllNotesHandler)
router.post('/notes', CreateNoteHandler)
router.get('/notes/:id', GetPersonalNoteByHandler)
router.put('/notes/:id', EditNoteHandler)
router.delete('/notes/:id', DeleteNoteHandler)

module.exports = router;

