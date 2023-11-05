const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discussionPostSchema = new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: "Group",
        required: [true, "Group is required"],
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minlength: 3,
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        trim: true,
        minlength: 3,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }, ],
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }, ],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }, ]
}, {
    timestamps: true,
});

const DiscussionPost = mongoose.model("DiscussionPost", discussionPostSchema);
module.exports = DiscussionPost;