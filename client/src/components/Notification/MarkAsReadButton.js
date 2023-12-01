import { NotificationReadService } from "../../services/NotificationServices";
/**
 * Functional component representing a button to mark a notification as read.
 * 
 * @param {Object} props - The properties passed to the component.
 *   @param {string} id - The unique identifier of the notification to be marked as read.
 */
export default function MarkAsReadButton(props){
    const {id} = props;
    /**
     * Handles the action of marking a notification as read.
     * Invokes NotificationReadService to update the notification status and reloads the page.
     */
    function handleMarkAsRead(){
        NotificationReadService(id);
        window.location.reload();
    }
     /**
     * MarkAsReadButton component
     * Provides a button for marking a notification as read.
     */
    return (
        <button onClick={handleMarkAsRead} className="mx-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg text-sm font-light mr-2">Mark as read</button>
    )
}