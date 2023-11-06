import AxiosInstance from "./AxiosInstance";

async function CreateDiscussionPostService( groupID, title, content) {
    try {
        
        const response = await AxiosInstance.post("/discussions/" + groupID, {title, content});
        return response.data;
    } catch (error) {
        console.log(error);
    }
    }

async function GetAllDiscussionPostsService(groupID) {
    try {
        const response = await AxiosInstance.get("/discussions/" + groupID);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

    export {
        CreateDiscussionPostService,
        GetAllDiscussionPostsService
    }