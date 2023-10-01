const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lectureDateSchema = new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: "Group",
    },
    date: {
        type: Date,
        required: [true, "Date is required"],
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "LectureNote",
    }],
    
}, {
    timestamps: true,
});

const LectureDate = mongoose.model("LectureDate", lectureDateSchema);
module.exports = LectureDate;
