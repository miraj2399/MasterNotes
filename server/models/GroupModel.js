const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const groupSchema = new Schema({
    name: {
        type: String,
        required: [true, "Group name is required"],
        trim: true,
        minlength: 3,
    },
    courseNumber: {
        type: String,
        required: [true, "Course number is required"],
        trim: true,
        minlength: 3,
    },
    courseTitle: {
        type: String,
        required: [true, "Course title is required"],
        trim: true,
        minlength: 3,
    },
    inviteOnly: {
        type: Boolean,
        required: [true, "Public status is required"],
        default: true, 
    },
    instructor: {
        type: String,
        required: [true, "Instructor is required"],
        trim: true,
        minlength: 3,
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        trim: true,
        minlength: 3,
    },
    startTime: {
        type: String,
        required: [true, "Start time is required"],
        trim: true,
        minlength: 3,
    },
    endTime: {
        type: String,
        required: [true, "End time is required"],
        trim: true,
        minlength: 3,
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
    },
    endDate: {
        type: Date,
        required: [true, "End date is required"],
    },
    weekdays: {
        type: [String],
        required: [true, "Weekdays are required"],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Owner is required"],
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    dates: [{
        type: Schema.Types.ObjectId,
        ref: "LectureDate",
    }],
    notes : [{
        type: Schema.Types.ObjectId,
        ref: "LectureNote",
    }],
    invites: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        minlength: 3,
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: "Tag",
    }, ],
    discussions: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: "DiscussionPost",
    }, ],
},
{
    timestamps: true,
});


const Group = mongoose.model("Group", groupSchema);
module.exports = Group;