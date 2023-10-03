import InviteJoinGroup from "../components/InviteJoinGroup";
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

async function JoinGroupService (id) {
    try {
        const response = await AxiosInstance.get(`/groups/join/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function LeaveGroupService (id) {
    try {
        const response = await AxiosInstance.get(`/groups/leave/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function InviteJoinGroupService ( groupId, emails, message) {
    try {
        const response = await AxiosInstance.post("/groups/invite", {groupId, emails, message});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}





export {
    CreateGroupService,
    GetAllGroupsService,
    GetGroupByIdService,
    JoinGroupService,
    LeaveGroupService,
    InviteJoinGroupService
}

