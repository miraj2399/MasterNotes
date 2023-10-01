import AxiosInstance from "./AxiosInstance";

async function CreateGroupService(group) {
    try {
        const response = await AxiosInstance.post("/groups", group);
        return response.data;
    } catch (error) {
        console.log(error);
    }
    }

async function GetAllGroupsService() {
    try {
        const response = await AxiosInstance.get("/groups");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function GetGroupByIdService(id) {
    try {
        const response = await AxiosInstance.get(`/groups/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}



export {
    CreateGroupService,
    GetAllGroupsService,
    GetGroupByIdService
}

