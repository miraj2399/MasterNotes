const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lectureNoteSchema = new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: "Group",
        required: [true, "Group is required"],
    },
    date: {
        type: Schema.Types.ObjectId,
        ref: "LectureDate",
        required: [true, "Date is required"],
    },
    content: {
        type: String,
        required: [true, "Note is required"],
        trim: true,
        minlength: 20,
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
    }, ],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: "Tag",
    }, ],
}, {
    timestamps: true,
});

const LectureNote = mongoose.model("LectureNote", lectureNoteSchema);
module.exports = LectureNote;