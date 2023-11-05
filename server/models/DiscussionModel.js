const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discussionPostSchema = new Schema({
    group:{
        type: Schema.Types.ObjectId,
        ref: "Group",
        required: [true, "Group is required"],
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "DiscussionPost",
    }, ]
}, {
    timestamps: true,
});
