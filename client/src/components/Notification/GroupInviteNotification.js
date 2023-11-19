import { JoinGroupService, DeclineGroupInviteService } from "../../services/GroupServices";
import { NotificationReadService } from "../../services/NotificationServices";
import MarkAsReadButton from "./MarkAsReadButton";
export default function GroupInviteNotification(props) {
    const {notification} = props;
    function handleAccept(){
        JoinGroupService(notification.group).then((response)=>{
            NotificationReadService(notification._id);
            window.location.reload();
        }
        );
    }

    function handleDecline(){
        DeclineGroupInviteService(notification.group).then((response)=>{
            NotificationReadService(notification._id);
            window.location.reload();
        }
        );
    }
    


    return (
        
        <div className=" bg-white hover:bg-gray-100 rounded-lg  py-2 px-4 my-2 mb-1">
            <div className="flex justify-start items-center">
            <div className="text-gray-500 text-xs mx-3">{new Date(notification.createdAt).toLocaleString()}</div>
                <div className="flex items-center mr-3">
                    <div className="text-gray-600 font-semibold text-sm">{notification.text}{notification.message?":"+notification.message:""}</div>
                </div>
                <div className="flex items-center">
                    <button onClick={handleAccept} className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg text-sm font-light mr-2">Accept</button>
                    <button onClick={handleDecline} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-sm font-light">Decline</button>
                    <MarkAsReadButton id={notification._id}/>
                </div>
            </div>
        </div>
    )
}