const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: {
        type: String,
        required: [true, "Tag name is required"],
        trim: true,
        minlength: 3,
    },
    color: {
        type: String,
        required: [true, "Tag color is required"],
        trim: true,
        minlength: 3,
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: "Group",
        required: [true, "Group is required"],
    },
});

const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;