import { useState,useEffect } from "react"
import { GetAllNotifications } from "../services/NotificationServices"
import { JoinGroupService, DeclineGroupInviteService} from "../services/GroupServices";
import { Typography } from "@mui/material"

export default function NotificationCenter() {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        GetAllNotifications().then((data) => {
            setNotifications(data);
        })
    }, [])

    function handleAccept(id){
        JoinGroupService(id).then((data) => {
            window.location.href = "/dashboard"
        })
    }
    function handleDecline(id){
        DeclineGroupInviteService(id).then((data) => {
            window.location.href = "/dashboard"
        })
    }

    return (
        <div>
            <div className="flex justify-center items-center gap-2 mb-10">
                <Typography variant="h5">Notifications</Typography>
            </div>
            <div className="grid">
                {
                    notifications.map((notification) => {
                        if (notification.type=="GroupInvite"){
                            return (
                                <div key={notification._id} className="border border-red-100 border-1 p-4 m-2 ">
                                    <p className="text-gray-500 text-sm">{new Date(notification.createdAt).toDateString()}</p>
                                    <div className='prose  p-5 border border-gray-300 outline-none '>
                                        <p className="text-gray-500 text-sm">{notification.text}: "{notification.message}"</p>
                                        
                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                                        onClick={() => handleAccept(notification.group)}
                                        >
                                        Accept
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                        onClick={() => handleDecline(notification.group)}
                                        >
                                        Decline
                                    </button>
                                    </div>
                                    
                                    </div>

                            )
                        }
                    })
                }
            </div>
        </div>
    )
}