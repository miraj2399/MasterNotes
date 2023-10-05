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

async function NotificationReadHandler(req,res){
    try{
        const notification = await Notification.findByIdAndUpdate(req.params.id, {read: true});
        res.status(200).json(notification);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
}


module.exports = {
    GetAllNotificationsHandler,
    NotificationReadHandler
}