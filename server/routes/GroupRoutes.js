const router = require("express").Router();
const {
  CreateGroupHandler,
  GetAllGroupsHandler,
  GetGroupByIdHandler,
  CreateGroupInviteHandler,
  DeclineGroupInviteHandler,
  JoinGroupHandler,
  LeaveGroupHandler,
  CreateGroupLectureNoteHandler,
  GetGroupLectureNotesByIdHandler,
  CreateCommentHandler
} = require("../controllers/GroupController");

router.get("/", GetAllGroupsHandler);
router.post("/", CreateGroupHandler);
router.post("/notes", CreateGroupLectureNoteHandler);
router.post("/notes/:id/comments", CreateCommentHandler);
router.get("/notes/:id", GetGroupLectureNotesByIdHandler);
router.post("/invite", CreateGroupInviteHandler);
router.post("/decline/:id", DeclineGroupInviteHandler);
router.get("/join/:id", JoinGroupHandler);
router.get("/leave/:id", LeaveGroupHandler);
router.get("/:id", GetGroupByIdHandler);


module.exports = router;
