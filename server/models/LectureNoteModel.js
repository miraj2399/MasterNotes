const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lectureNoteSchema = new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: "Group",
    },
    date: {
        type: Date,
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
}, {
    timestamps: true,
});

const LectureNote = mongoose.model("LectureNote", lectureNoteSchema);
module.exports = LectureNote;