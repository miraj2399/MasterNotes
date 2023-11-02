const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const personalBranchSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: "Group",
        required: [true, "Group is required"],
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "LectureNote",
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model("PersonalBranch", personalBranchSchema);