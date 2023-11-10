const Group = require("../models/GroupModel");
const User = require("../models/UserModel");
const LectureDate = require("../models/LectureDateModel");
const Notification = require("../models/NotificationModel");
const LectureNote = require("../models/LectureNoteModel");
const Comment = require("../models/CommentModel");
const Tag = require("../models/TagModel");
const PersonalBranch = require("../models/PersonalBranchModel");

const isMember = require("../utils/IsMember");
const getUser = require("../utils/GetUser");

async function CreateGroupHandler(req, res) {
  const {
    name,
    courseNumber,
    courseTitle,
    instructor,
    location,
    startTime,
    endTime,
    startDate,
    endDate,
    weekdays,
    description,
    inviteOnly,
    dates,
  } = req.body;

  try {
    const group = await Group.create({
      name: name,
      courseNumber: courseNumber,
      courseTitle: courseTitle,
      instructor: instructor,
      location: location,
      startTime: startTime,
      endTime: endTime,
      startDate: startDate,
      endDate: endDate,
      weekdays: weekdays,
      description: description,
      inviteOnly: inviteOnly,
      owner: req.userId,
    });

    /**
     * Create lecture dates for the group
     * lecture dates will store notes later
     */
    const lectureDates = [];

    for (let i = 0; i < dates.length; i++) {
      const lectureDate = await LectureDate.create({
        date: dates[i],
        group: group._id,
      });
      lectureDates.push(lectureDate._id);
    }
    await group.updateOne({
      $push: { dates: lectureDates, members: [req.userId] },
    });
    await User.findByIdAndUpdate(req.userId, { $push: { groups: group._id } });
    res.status(201).json(group);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

async function GetAllGroupsHandler(req, res) {
  try {
    const groupIds = await User.findById(req.userId).select("groups");
    const groups = await Group.find({
      _id: { $in: groupIds.groups },
    }).populate({
        path:"notes",
        select: "content upvotes downvotes comments",
    });
    res.status(200).json(groups);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

async function GetGroupByIdHandler(req, res) {
  try {

    const group = await Group.findById(req.params.id).populate([
      {
        path: "owner",
        select: "firstName lastName _id",
      },
      {
        path: "tags",
        select: "name color _id",
      },
    ]);
    const lectureDates = await LectureDate.find({
      _id: { $in: group.dates },
    });
    group.dates = lectureDates;

    const notes = await LectureNote.find({
      _id: { $in: group.notes },
    }).populate({
      path: "owner",
      select: "firstName lastName _id",
    });
    group.notes = notes;
    res.status(200).json(group);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

async function CreateGroupInviteHandler(req, res) {
  const { groupId, emails, message } = req.body;
  const group = Group.findById(groupId);
  if (!group) {
    return res.status(404).json({ message: "Group not found" });
  }
  try {
    /***
     *  Check if the groupId is valid
     *  if the groupId is valid,
     *     Check if the actor(the user who is making the group invite) is a member of the group
     */

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    const actor = await User.findById(req.userId);
    const isMember = await Group.findOne({ _id: groupId, members: req.userId });
    if (!isMember) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const text = `${actor.firstName} ${actor.lastName} invited you to join ${group.name}`;

    /***
     *  for each email, check if the user is registered
     *  if the user is registered,
     *      create a notification for the user if the user is not a member of the group
     *      update the notification if the user is already invited to the group
     *      disregard if the user is already a member of the group
     *  if the user is not registered,
     *     create a notification (type:"GroupInvite") for the email
     */

    emails.map(async (email) => {
      const user = await User.findOne({ email: email });

      if (user) {
        const isMember = group.members.includes(user._id);
        /**
         * Check if the user  or the email is already invited to the group
         * Need to check both user and email because it is possible that the user is registered after the invitation
         */

        const isInvited = await Notification.findOne({
          $or: [{ user: user._id }, { email: email }],
          group: group._id,
          type: "GroupInvite",
        });
        if (!isMember && !isInvited) {
          const notification = await Notification.create({
            text: text,
            message: message,
            type: "GroupInvite",
            group: group._id,
            actor: actor._id,
            user: user._id,
          });
          await group.updateOne({ $push: { invites: user._id } });
          await user.updateOne({ $push: { notifications: notification._id } });
        } else if (!isMember && isInvited) {
          await isInvited.updateOne({
            message: message,
            actor: actor._id,
            user: user._id,
            text: text,
            email: user.email,
            read: false,
          });
        }
      } else {
        // Check if invitation for the email already exists
        const isInvited = await Notification.findOne({
          email: email,
          group: group._id,
          type: "GroupInvite",
        });
        if (!isInvited) {
          await Notification.create({
            text: text,
            message: message,
            type: "GroupInvite",
            group: group._id,
            actor: actor._id,
            email: email,
          });
        } else {
          await isInvited.updateOne({
            message: message,
            actor: actor._id,
            text: text,
            read: false,
          });
        }
      }
    });
    return res.status(201).json({ message: "Invite sent" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

async function JoinGroupHandler(req, res) {
  const groupId = req.params.id;
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    // check if the user is already a member of the group
    const isMember = await Group.findOne({ _id: groupId, members: req.userId });
    if (isMember) {
      return res
        .status(200)
        .json({ message: "You are already a member of the group" });
    }
    /**
     * Check if the group is inviteOnly
     * if the group is not inviteOnly, add the user to the group
     */
    if (!group.inviteOnly) {
      await group.updateOne({ $push: { members: req.userId } });
      await User.findByIdAndUpdate(req.userId, {
        $push: { groups: group._id },
      });
      return res.status(201).json({ message: `Joined ${group.name}` });
    }
    const isInvited = await Notification.findOne({
      email: req.email,
      group: group._id,
      type: "GroupInvite",
    });
    if (!isInvited) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findOne({ email: req.email });
    await group.updateOne({ $push: { members: user._id } });
    await user.updateOne({ $push: { groups: group._id } });
    await isInvited.deleteOne();
    return res.status(201).json({ message: `Joined ${group.name}` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

async function DeclineGroupInviteHandler(req, res) {
  const groupId = req.params.id;
  const group = await Group.findById(groupId);
  if (!group) {
    return res.status(404).json({ message: "Group not found" });
  }
  try {
    // by email or by user
    const notification = await Notification.findOne({
      $or: [{ user: req.userId }, { email: req.email }],
      group: group._id,
      type: "GroupInvite",
    });
    if (!notification) {
      return res
        .status(404)
        .json({ message: "You are not invited to the group" });
    }
    await notification.deleteOne();
    return res.status(200).json({ message: "Invite cancelled" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

async function LeaveGroupHandler(req, res) {
  const groupId = req.params.id;
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    // check if the user is a member of the group
    const isMember = await Group.findOne({ _id: groupId, members: req.userId });
    if (!isMember) {
      return res
        .status(200)
        .json({ message: "You are not a member of the group" });
    }
    await group.updateOne({ $pull: { members: req.userId } });
    await User.findByIdAndUpdate(req.userId, { $pull: { groups: group._id } });
    return res.status(201).json({ message: `Left ${group.name}` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

async function CreateGroupLectureNoteHandler(req, res) {
  const { group, date, content, tags } = req.body;
  try {
    if (!group || !date || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const lectureNote = await LectureNote.create({
      group: group,
      date: date,
      content: content,
      owner: req.userId,
      tags: tags
    });
    const noteGroup = await Group.findById(group);
    await noteGroup.updateOne({ $push: { notes: lectureNote._id } });
    return res.status(201).json(lectureNote);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

async function DeleteLectureNoteHandler(req, res) {
  try {
    const lectureNote = await LectureNote.findById(req.params.id);
    if (!lectureNote) {
      return res.status(404).json({ message: "Lecture note not found" });
    }
    // check if the owner is the user
    if (lectureNote.owner.toString() !== req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await lectureNote.deleteOne({ _id: req.params.id });
    return res.status(200).json({ message: "Lecture note deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

async function EditLectureNoteHandler(req, res) {
  try {
    const lectureNote = await LectureNote.findById(req.params.id);
    if (!lectureNote) {
      return res.status(404).json({ message: "Lecture note not found" });
    }
    // check if the owner is the user
    if (lectureNote.owner.toString() !== req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { content } = req.body;

    const updatedNote = await LectureNote.findByIdAndUpdate(
      req.params.id,
      { content: content },
      { new: true }
    );

    return res.status(200).json(updatedNote);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

async function GetGroupLectureNotesByIdHandler(req, res) {
  const lectureNoteId = req.params.id;

  try {
    const lectureNote = await LectureNote.findById(lectureNoteId).populate(
      {
        path:"tags",
        select: "name color _id",

      }
    );
    if (!lectureNote) {
      return res.status(404).json({ message: "Lecture note not found" });
    }
    // check if the user is a member of the group
    const group = await Group.findById(lectureNote.group);
    const userIsMemberOfGroup = await isMember(req.userId, group._id);
    const comments = await Comment.find({
      _id: { $in: lectureNote.comments },
    }).populate({
      path: "owner",
      select: "firstName lastName",
    });
    lectureNote.comments = comments;
    

    


    if (userIsMemberOfGroup) {
      lectureNote.owner = await getUser(lectureNote.owner);
       // logic for upvotes and downvotes
        let lectureNoteObj = lectureNote.toObject();
        const upvoted = lectureNote.upvotes.includes(req.userId);
        const downvoted = lectureNote.downvotes.includes(req.userId);
        lectureNoteObj.upvotes = lectureNote.upvotes.length;
        lectureNoteObj.downvotes = lectureNote.downvotes.length;
        lectureNoteObj.upvoted = upvoted;
        lectureNoteObj.downvoted = downvoted;

      return res.status(200).json(lectureNoteObj);
    }

   

    return res.status(401).json({ message: "Unauthorized" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

const CreateCommentHandler = async (req, res) => {
  const noteId = req.params.id;
  const userId = req.userId;
  const note = await LectureNote.findById(noteId);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  const user = await User.findById(userId);
  const member = await isMember(userId, note.group);
  if (!member) {
    return res
      .status(401)
      .json({ message: "You are not a member of this group" });
  }
  const { content } = req.body;
  try {
    const newComment = await Comment.create({
      note: noteId,
      owner: userId,
      content: content,
    });
    await LectureNote.findByIdAndUpdate(noteId, {
      $push: { comments: [...note.comments, newComment._id] },
    });
    return res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UpvoteHandler = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await LectureNote.findById(noteId);
    const userId = req.userId;
    // check if the user is a member of the group
    const aMember = await isMember(userId, note.group);
    if (!aMember) {
      return res
        .status(401)
        .json({ message: "You are not a member of this group" });
    }
    const alreadyUpVoted = await LectureNote.findOne({
        _id: noteId,
        upvotes: userId,
        }); 

    if (alreadyUpVoted) {
      await LectureNote.findByIdAndUpdate(noteId, {
        $pull: { upvotes: userId },
      });
      return res.status(200).json({ message: "Upvote removed" });
    }

    // check if the user has downvoted the note, if so, remove the downvote and add the upvote

    const alreadyDownvoted = LectureNote.findOne({
      _id: noteId,
      downvotes: userId,
    });
    
    if (alreadyDownvoted) {
      await LectureNote.findByIdAndUpdate(noteId, {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      });
      return res.status(200).json({ message: "Upvote added" });
    } else {
      await LectureNote.findByIdAndUpdate(noteId, {
        $push: { upvotes: userId },
      });
      return res.status(200).json({ message: "Upvote added" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const DownvoteHandler = async (req, res) => {
    try {
      const noteId = req.params.id;
      const note = await LectureNote.findById(noteId);
      const userId = req.userId;
      // check if the user is a member of the group
      const aMember = await isMember(userId, note.group);
      if (!aMember) {
        return res
          .status(401)
          .json({ message: "You are not a member of this group" });
      }
      // check if the user has already downvoted the note, if so, remove the downvote
      const alreadyDownVoted = await LectureNote.findOne({
        _id: noteId,
        downvotes: userId,
      });
      if (alreadyDownVoted) {
        await LectureNote.findByIdAndUpdate(noteId, {
          $pull: { downvotes: userId },
        });
        return res.status(200).json({ message: "Downvote removed" });
      }
  
      // check if the user has upvoted the note, if so, remove the upvote and add the downvote
      const alreadyUpvoted = await LectureNote.findOne({
        _id: noteId,
        upvotes: userId,
      });
      
      if (alreadyUpvoted) {
        await LectureNote.findByIdAndUpdate(noteId, {
          $pull: { upvotes: userId },
          $push: { downvotes: userId },
        });
        return res.status(200).json({ message: "Downvote added" });
      } else {
        await LectureNote.findByIdAndUpdate(noteId, {
          $push: { downvotes: userId },
        });
        return res.status(200).json({ message: "Downvote added" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

const GetAllDatesByGroupIdHandler = async (req, res) => {
  try {
    const dates = await LectureDate.find({ group: req.params.id });
    res.status(200).json(dates);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const GetPersonBranchHandler = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
        return res.status(404).json({ message: "Group not found" });
        }
        const noteref = await PersonalBranch.findOne({user: req.userId, group: req.params.id});
        if (!noteref) {
            const newNoteRef = await PersonalBranch.create({
                user: req.userId,
                group: req.params.id,
                notes: [],
            });
            return res.status(201).json(newNoteRef);
        }
        return res.status(200).json(noteref);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
    }

const AddNoteToPersonalBranchHandler = async (req, res) => {
   const noteId = req.params.id
    try {
        const note = await LectureNote.findById(noteId);
        if (!note) {
        return res.status(404).json({ message: "Note not found" });
        }
        const groupId = note.group;
        const group = await Group.findById(groupId);
        if (!group) {
        return res.status(404).json({ message: "Group not found" });
        }
        const noteref = await PersonalBranch.findOne({user: req.userId, group: groupId});
        if (!noteref) {
            const newNoteRef = await PersonalBranch.create({
                user: req.userId,
                group: groupId,
                notes: [noteId],
            });
            return res.status(201).json(newNoteRef);
        }
        else {
            // check if the note is already in the branch
            const isNoteInBranch = noteref.notes.includes(noteId);
            if (isNoteInBranch) {
                return res.status(200).json({message: "Note already in branch"});
            }
            await noteref.updateOne({$push: {notes: noteId}});
            return res.status(200).json({message: "Note added to branch"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
    }

const AddTagToGroupHander = async (req, res) => {
  const groupId = req.params.id;
  
  try {
    const { name, color } = req.body;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    // first check if tag already exists with the same name and group
    const tagExists = await Tag.findOne({ name: name, group: groupId });
    if (tagExists) {
      return res.status(200).json({ message: "Tag already exists" });
    }

    const tag = await Tag.create({
      name: name,
      color: color,
      group: groupId,
    });
    await group.updateOne({ $push: { tags: tag._id } });
    return res.status(201).json(tag);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

const DeleteTagFromGroupHandler = async (req, res) => {
  const groupId = req.params.id;
  const tagId = req.params.tagId;
  console.log("deleting tag");
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    const tag = Tag.findById(tagId);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    await group.updateOne({ $pull: { tags: tagId } });
    const deletedTag = await Tag.findByIdAndDelete(tagId);
    return res.status(200).json({ message: "Tag deleted" });

  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

async function EditGroupInviteOnlyHandler(req, res) {
  const groupId = req.params.id;
  const inviteOnly = req.body.inviteOnly; // Assuming the inviteOnly value is in the request body

  console.log("EditGroupInviteOnlyHandler - groupId:", groupId);
  console.log("EditGroupInviteOnlyHandler - inviteOnly:", inviteOnly);

  try {
    const group = await Group.findByIdAndUpdate(groupId, { inviteOnly: inviteOnly });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    return res.status(200).json({ message: "Group inviteOnly updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}






module.exports = {
  CreateGroupHandler,
  GetAllGroupsHandler,
  GetGroupByIdHandler,
  CreateGroupInviteHandler,
  JoinGroupHandler,
  DeclineGroupInviteHandler,
  LeaveGroupHandler,
  CreateGroupLectureNoteHandler,
  DeleteLectureNoteHandler,
  EditLectureNoteHandler,
  GetGroupLectureNotesByIdHandler,
  CreateCommentHandler,
  GetAllDatesByGroupIdHandler,
  UpvoteHandler,
DownvoteHandler,
GetPersonBranchHandler,
AddNoteToPersonalBranchHandler,
AddTagToGroupHander,
DeleteTagFromGroupHandler,
EditGroupInviteOnlyHandler,
};
