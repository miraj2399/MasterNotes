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

        <div className="flex flex-col items-center m-8 divide-y">
            <div className="hover:text-red-300 text-gray-800 text-4xl text-center font-extralight mb-5">Notifications</div>
            <div className="grid w-full">
                <div className="text-xl font-light mb-2 mt-2">Unread</div>
                {!unreadNotifications[0] && 
                <> 
                <div className="font-light text-md ml-10 mb-5">No notifications</div>
                </>}
                {unreadNotifications.map((notification) => <GroupInviteNotification key={notification._id} notification={notification} />)}
            </div>
            <div className="grid w-full">
                <div className="text-xl font-light mb-2 mt-2">Read</div>
                {!readNotifications[0] && 
                <> 
                <div className="font-light text-md ml-10 mb-5">No notifications</div>
                </>}
                {readNotifications.map((notification) => <GroupInviteNotification key={notification._id} notification={notification} />)}
            </div>
        </div>
    )
}
