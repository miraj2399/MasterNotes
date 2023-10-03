import AxiosInstance from "./AxiosInstance";

async function GetAllNotifications() {
    try {
        const response = await AxiosInstance.get("/notifications");
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export {
    GetAllNotifications
}