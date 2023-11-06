import AxiosInstance from "./AxiosInstance";

async function CreateDiscussionPostService(group, title, text) {
    try {
        const response = await AxiosInstance.post("groups/discussion", {group, title, text});
        return response.data;
    } catch (error) {
        console.log(error);
    }
    }

    export {
        CreateDiscussionPostService
    }