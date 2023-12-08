import AxiosInstance from "./AxiosInstance";
//this function serves to make the post request to the endpoint "/discussions". It sends information about the groups (title and content) in the request to create a group. If there is an error, then that error is logged.
async function CreateDiscussionPostService( groupID, title, content) {
    try {
        
        const response = await AxiosInstance.post("/discussions/" + groupID, {title, content});
        return response.data;
    } catch (error) {
        console.log(error);
    }
    }

//this function serves to make the post request to the endpoint "/discussions". It sends information about the group id in the request to get all the discussions for this group. If there is an error, then that error is logged.
async function GetAllDiscussionPostsService(groupID) {
    try {
        const response = await AxiosInstance.get("/discussions/" + groupID);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//this function serves to make the post request to the endpoint "/discussions/comment/{id}". It sends information about the content in the request to create a comment for the discussion thread with the id that is passes as a parameter. If there is an error, then that error is logged.
async function CreateDiscussionCommentService(id, content){
    try {
        const response = await AxiosInstance.post(`/discussions/comment/${id}`, {content});
        return response.data;
    } catch (error) {
        console.log(error);
        console.log(id);
    }
}

//this function serves to make the post request to the endpoint "/discussions/thread/{id}". It sends information about the group id in the request to delete that group. If there is an error, then that error is logged.
async function DeleteDiscussionPostService(id) {
    try {
        const response = await AxiosInstance.delete(`/discussions/thread/${id}`).then((res) => {
            window.location.reload();
        }
        );
        
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//this function serves to make the post request to the endpoint "/discussions/comment/{id}". It sends information about the group id in the request to delete the comment in that group. If there is an error, then that error is logged.
async function DeleteDiscussionCommentService(id){
    try {
        const response = await AxiosInstance.delete(`/discussions/comment/${id}`).then((res) => {
        }
        );
        
        return response.data;
    } catch (error) {
        console.log(error);
    }
}



    export {
        CreateDiscussionPostService,
        GetAllDiscussionPostsService,
        CreateDiscussionCommentService,
        DeleteDiscussionPostService,
        DeleteDiscussionCommentService
    }