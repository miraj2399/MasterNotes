import AxiosInstance from "./AxiosInstance";

//Retrieves all notifications by sending a GET request to the "/notifications" endpoint.
async function GetAllNotificationsService() {
    try {
        const response = await AxiosInstance.get("/notifications");
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

//Marks a specific notification as read by sending a POST request to the "/notifications/read/{id}" endpoint
async function NotificationReadService(id) {
    try {
        const response = await AxiosInstance.post(`/notifications/read/${id}`);
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export {
    GetAllNotificationsService,
    NotificationReadService,
}