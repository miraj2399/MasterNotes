const DiscussionPost = require("../models/DiscussionPostModel");
const Discussion = require("../models/DiscussionModel");
const User = require("../models/UserModel");
const Group = require("../models/GroupModel");
const Comment = require("../models/CommentModel");
const Tag = require("../models/TagModel");
const isMember = require("../utils/IsMember");

const createDiscussionPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const owner = req.userId;
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }
    // check if user is a member of the group
    if (!isMember(group, owner)) {
      return res.status(403).json({
        message: "You are not a member of this group",
      });
    }
    const discussionPost = await DiscussionPost.create({
      title,
      content,
      owner,
      group: group._id,
    });

    // add discussion post to group
    group.discussions.push(discussionPost._id);
    const newGroup = await Group.updateOne(
      {
        _id: group._id,
      },
      {
        discussions: group.discussions,
      },
      { new: true }
    );

    // return all discussion posts
    const discussions = await DiscussionPost.find({
      group: group._id,
    }).populate([
      {
        path: "comments",
        populate: {
          path: "owner",
          select:
            "-password -verified -email -createdAt -updatedAt -__v -groups",
        },
      },
      {
        path: "owner",
        select: "-password -verified -email -createdAt -updatedAt -__v -groups",
      },
    ]);

    return res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({
      message: "Error creating discussion post",
      error: error.message,
    });
  }
};

const getAllDiscussionPosts = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate(
      "discussions"
    );

    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }
    const discussions = group.discussions;
    // return discussions with populated comments and owner with exclude password
    const populatedDiscussions = await DiscussionPost.populate(discussions, [
      {
        path: "comments",
        populate: {
          path: "owner",
          select:
            "-password -verified -email -createdAt -updatedAt -__v -groups",
        },
      },
      {
        path: "owner",
        select: "-password -verified -email -createdAt -updatedAt -__v -groups",
      },
    ]);
    return res.status(200).json(populatedDiscussions);
  } catch (error) {
    res.status(500).json({
      message: "Error getting discussion posts",
      error: error.message,
    });
  }
};

const getDiscussionPostById = async (req, res) => {
  try {
    const discussionPost = await DiscussionPost.findById(
      req.params.id
    ).populate([
      {
        path: "comments",
        populate: {
          path: "owner",
          select:
            "-password -verified -email -createdAt -updatedAt -__v -groups",
        },
      },
      {
        path: "owner",
        select: "-password -verified -email -createdAt -updatedAt -__v -groups",
      },
    ]);

    if (!discussionPost) {
      return res.status(404).json({
        message: "Discussion post not found",
      });
    }
    return res.status(200).json(discussionPost);
  } catch (error) {
    res.status(500).json({
      message: "Error getting discussion post",
      error: error.message,
    });
  }
};

const RemoveDiscussionPostHandler = async (req, res) => {
  try {
    const discussionPost = await DiscussionPost.findById(req.params.id);
    if (!discussionPost) {
      return res.status(404).json({
        message: "Discussion post not found",
      });
    }
    const group = await Group.findById(discussionPost.group);
    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    // check if user is a member of the group
    if (!isMember(group, req.userId)) {
      return res.status(403).json({
        message: "You are not a member of this group",
      });
    }
    // check if user is the owner of the discussion post
    if (discussionPost.owner != req.userId) {
      return res.status(403).json({
        message: "You are not the owner of this discussion post",
      });
    }
    // remove discussion post from group
    const newGroup = await Group.updateOne(
      {
        _id: group._id,
      },
      {
        $pull: {
          discussions: discussionPost._id,
        },
      }
    );
    // delete discussion post
    const deletedDiscussionPost = await DiscussionPost.findByIdAndDelete(
      req.params.id
    );
    return res.status(200).json(deletedDiscussionPost);
  } catch (error) {
    res.status(500).json({
      message: "Error deleting discussion post",
      error: error.message,
    });
  }
};

const AddCommentHandler = async (req, res) => {
  const discussionPost = await DiscussionPost.findById(req.params.id);
  if (!discussionPost) {
    return res.status(404).json({
      message: "Discussion post not found",
    });
  }

  // check if user is a member of the group
  const group = await Group.findById(discussionPost.group);
  if (!isMember(group, req.userId)) {
    return res.status(403).json({
      message: "You are not a member of this group",
    });
  }

  const { content } = req.body;
  const owner = req.userId;

  const comment = await Comment.create({
    content,
    owner,
    discussionPost: discussionPost._id,
  });

  // add comment to discussion post
  const updatedDiscussionPost = await DiscussionPost.updateOne(
    {
      _id: discussionPost._id,
    },
    {
      $push: {
        comments: comment._id,
      },
    }
  );
  const newDiscussionPost = await DiscussionPost.findById(
    discussionPost._id
  ).populate([
    {
      path: "comments",
      populate: {
        path: "owner",
        select: "-password -verified -email -createdAt -updatedAt -__v -groups",
      },
    },
    {
      path: "owner",
      select: "-password -verified -email -createdAt -updatedAt -__v -groups",
    },
  ]);

  return res.status(200).json(newDiscussionPost);
};

const RemoveCommentHandler = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }
    const discussionPost = await DiscussionPost.findById(
      comment.discussionPost
    );
    if (!discussionPost) {
      return res.status(404).json({
        message: "Discussion post not found",
      });
    }

    const group = await Group.findById(discussionPost.group);
    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    // check if user is a member of the group
    if (!isMember(group._id, req.userId)) {
      return res.status(403).json({
        message: "You are not a member of this group",
      });
    }
    // check if user is the owner of the comment
    if (comment.owner != req.userId) {
      return res.status(403).json({
        message: "You are not the owner of this comment",
      });
    }
    // remove comment from discussion post
    const newDiscussionPost = await DiscussionPost.updateOne(
      {
        _id: discussionPost._id,
      },
      {
        $pull: {
          comments: comment._id,
        },
      }
    );
    // delete comment
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletedComment);
  } catch (error) {
    res.status(500).json({
      message: "Error deleting comment",
      error: error.message,
    });
  }
};

module.exports = {
  createDiscussionPost,
  getAllDiscussionPosts,
  RemoveDiscussionPostHandler,
  getDiscussionPostById,
  AddCommentHandler,
  RemoveCommentHandler,
};
