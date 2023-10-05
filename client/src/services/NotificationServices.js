import AxiosInstance from "./AxiosInstance";

async function GetAllNotificationsService() {
    try {
        const response = await AxiosInstance.get("/notifications");
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

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