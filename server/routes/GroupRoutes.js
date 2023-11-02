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
  DeleteLectureNoteHandler,
  EditLectureNoteHandler,
  GetGroupLectureNotesByIdHandler,
  CreateCommentHandler,
  GetAllDatesByGroupIdHandler,
  UpvoteHandler,
  DownvoteHandler,
} = require("../controllers/GroupController");

router.get("/", GetAllGroupsHandler);
router.post("/", CreateGroupHandler);
router.post("/notes", CreateGroupLectureNoteHandler);
router.delete("/notes/:id", DeleteLectureNoteHandler);
router.put("/notes/:id", EditLectureNoteHandler)
router.post("/notes/:id/comments", CreateCommentHandler);
router.get("/notes/:id", GetGroupLectureNotesByIdHandler);
router.post("/notes/:id/upvote", UpvoteHandler);
router.post("/notes/:id/downvote", DownvoteHandler);
router.post("/invite", CreateGroupInviteHandler);
router.post("/decline/:id", DeclineGroupInviteHandler);
router.get("/join/:id", JoinGroupHandler);
router.get("/leave/:id", LeaveGroupHandler);
router.get("/:id", GetGroupByIdHandler);
router.get("/:id/dates", GetAllDatesByGroupIdHandler);



module.exports = router;
