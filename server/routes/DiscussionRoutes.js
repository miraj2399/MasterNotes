const router = require("express").Router();

const {
    createDiscussionPost,
    getAllDiscussionPosts,
    getDiscussionPostById,
    RemoveDiscussionPostHandler,
    AddCommentHandler,
    RemoveCommentHandler
} = require("../controllers/DiscussionController");

// create discussion post in a group
router.post("/:groupId", createDiscussionPost);

// get all discussion posts in a group
router.get("/:groupId", getAllDiscussionPosts);

// get a discussion post by id
router.get("/thread/:id", getDiscussionPostById);

// delete a discussion post by id
router.delete("/thread/:id", RemoveDiscussionPostHandler);

// add comment to a discussion post by discussion post id
router.post("/comment/:id", AddCommentHandler);

// delete a comment by discussion post by comment id
router.delete("/comment/:id", RemoveCommentHandler);


module.exports = router;

