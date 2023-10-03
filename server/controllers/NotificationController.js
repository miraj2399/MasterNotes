const Notification = require('../models/NotificationModel');
async function GetAllNotificationsHandler(req,res){
    try{
        const notifications = await Notification.find({user: req.userId});
        res.status(200).json(notifications);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    GetAllNotificationsHandler
}