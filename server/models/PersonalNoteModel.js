const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personalNoteSchema = new Schema({
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

const PersonalNote = mongoose.model("PersonalNote", personalNoteSchema);
module.exports = PersonalNote;