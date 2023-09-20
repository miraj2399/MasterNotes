const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 5,
    },
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        minlength: 3,
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        minlength: 3,
    },
    verified: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});
const User = mongoose.model("User", userSchema);