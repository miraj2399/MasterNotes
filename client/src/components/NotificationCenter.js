import { useState, useEffect } from "react";
import { GetAllNotificationsService } from "../services/NotificationServices";
import GroupInviteNotification from "./Notification/GroupInviteNotification";
export default function NotificationCenter() {
    const [readNotifications, setReadNotifications] = useState([]);
    const [unreadNotifications, setUnreadNotifications] = useState([]);

    useEffect(() => {
        GetAllNotificationsService().then((notifications) => {
            setReadNotifications(notifications.filter((notification) => notification.read));
            setUnreadNotifications(notifications.filter((notification) => !notification.read));
        });
    }
    , []);

    return (

        <div className="flex flex-col items-center">
            <div className="text-2xl font-semibold mb-2">Notifications</div>
            <div className="grid w-full">
                <div className="text-xl font-semibold mb-2">Unread</div>
                {unreadNotifications.map((notification) => <GroupInviteNotification key={notification._id} notification={notification} />)}
            </div>
            <div className="grid w-full">
                <div className="text-xl font-semibold mb-2">Read</div>
                {readNotifications.map((notification) => <GroupInviteNotification key={notification._id} notification={notification} />)}
            </div>
        </div>
    )
}
