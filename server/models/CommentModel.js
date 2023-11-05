const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    note: {
        type: Schema.Types.ObjectId,
        ref: 'Note',
        required: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    ownerName: {
        type: String
    },
    discussionPost: {
        type: Schema.Types.ObjectId,
        ref: 'DiscussionPost'
    },
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
