import { NotificationReadService } from "../../services/NotificationServices";
export default function MarkAsReadButton(props){
    const {id} = props;
    function handleMarkAsRead(){
        NotificationReadService(id);
        window.location.reload();
    }
    return (
        <button onClick={handleMarkAsRead} className="mx-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg text-sm font-light mr-2">Mark as read</button>
    )
}