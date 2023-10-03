const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationActionSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

const NotificationAction = mongoose.model('NotificationAction', NotificationActionSchema);
module.exports = NotificationAction;