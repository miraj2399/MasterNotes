const router = require("express").Router();
const {
  CreateGroupHandler,
  GetAllGroupsHandler,
  GetGroupByIdHandler,
  CreateGroupInviteHandler,
  DeclineGroupInviteHandler,
  JoinGroupHandler,
  LeaveGroupHandler,
} = require("../controllers/GroupController");

router.get("/", GetAllGroupsHandler);
router.post("/", CreateGroupHandler);
router.post("/invite", CreateGroupInviteHandler);
router.post("/decline/:id", DeclineGroupInviteHandler);
router.get("/join/:id", JoinGroupHandler);
router.get("/leave/:id", LeaveGroupHandler);
router.get("/:id", GetGroupByIdHandler);


module.exports = router;
