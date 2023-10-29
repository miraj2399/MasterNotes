const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    note: {
        type: Schema.Types.ObjectId,
        ref: 'Note'
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
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
