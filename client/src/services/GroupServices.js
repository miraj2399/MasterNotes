import AxiosInstance from "./AxiosInstance";
//Manages Axios configuration for making HTTP requests


//Creates a new group by sending a POST request to the "/groups" endpoint
async function CreateGroupService(group) {
    try {
        const response = await AxiosInstance.post("/groups", group);
        return response.data;
    } catch (error) {
        console.log(error);
    }
    }
//Retrieves all groups by sending a GET request to the "/groups" endpoint
async function GetAllGroupsService() {
    try {
        const response = await AxiosInstance.get("/groups");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Retrieves a specific group by its ID by sending a GET request to the "/groups/{id}" endpoint
async function GetGroupByIdService(id) {
    try {
        const response = await AxiosInstance.get(`/groups/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Sends a GET request to join a specific group using the "/groups/join/{id}" endpoint
async function JoinGroupService (id) {
    try {
        const response = await AxiosInstance.get(`/groups/join/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Sends a GET request to leave a specific group using the "/groups/leave/{id}" endpoint
async function LeaveGroupService (id) {
    try {
        const response = await AxiosInstance.get(`/groups/leave/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Invites users to join a group by sending a POST request to the "/groups/invite" endpoint
async function InviteJoinGroupService ( groupId, emails, message) {
    try {
        const response = await AxiosInstance.post("/groups/invite", {groupId, emails, message});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Declines an invitation to join a group by sending a POST request to "/groups/decline/{groupId}"
async function DeclineGroupInviteService (groupId) {
    try {
        const response = await AxiosInstance.post(`/groups/decline/${groupId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Creates a new lecture note for a group by sending a POST request to the "/groups/notes" endpoint
async function CreateGroupLectureNoteService (group, date, content, tags) {
    tags = tags.map((tag) => tag._id);
    try {
        const response = await AxiosInstance.post("/groups/notes", {group,date,content, tags});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Deletes a specific group's lecture note by sending a DELETE request to the "/groups/notes/{id}" endpoint
async function DeleteGroupLectureNoteService (id) {
    try {
        const response = await AxiosInstance.delete(`/groups/notes/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Edits the content of a specific group's lecture note by sending a PUT request to the "/groups/notes/{id}" endpoint
async function EditGroupLectureNoteService (id, content) {
    try {
        const response = await AxiosInstance.put(`/groups/notes/${id}`, {content});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Retrieves a specific group's lecture notes by sending a GET request to the "/groups/notes/{id}" endpoint
async function GetGroupLectureNotesByIdService (id) {
    try {
        const response = await AxiosInstance.get(`/groups/notes/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Adds a comment to a specific group's lecture note by sending a POST request to the "/groups/notes/{id}/comments" endpoint
async function CreateCommentService (id, content) {
    try {
        const response = await AxiosInstance.post(`/groups/notes/${id}/comments`, {content});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Retrieves all dates associated with a specific group by sending a GET request to the "/groups/{id}/dates" endpoint
async function GetAllDatesByGroupIdService (id) {
    try {
        const response = await AxiosInstance.get(`/groups/${id}/dates`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Upvotes a specific group's lecture note by sending a POST request to the "/groups/notes/{id}/upvote" endpoint
async function UpvoteService (id) {
    try {
        const response = await AxiosInstance.post(`/groups/notes/${id}/upvote`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Downvotes a specific group's lecture note by sending a POST request to the "/groups/notes/{id}/downvote" endpoint
async function DownvoteService (id) {
    try {
        const response = await AxiosInstance.post(`/groups/notes/${id}/downvote`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Retrieves the branch information for a person by sending a GET request to the "/groups/branch/{id}" endpoint
async function GetPersonBranchService (id) {
    try {
        const response = await AxiosInstance.get(`/groups/branch/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Adds a specific note to a person's branch by sending a POST request to the "/groups/branch/{noteId}" endpoint
async function AddNoteToPersonalBranchService (noteId) {
    try {
        const response = await AxiosInstance.post(`/groups/branch/${noteId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Creates tags for a specific group by sending a POST request to the "/groups/{id}/tags" endpoint
async function CreateTagsService (id, tag) {
    try {
        
        const response = await AxiosInstance.post(`/groups/${id}/tags`, {name: tag.name, color: tag.color});
        
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Deletes a specific tag for a group by sending a DELETE request to the "/groups/{id}/tags/{tagId}" endpoint
async function DeleteTagService (id, tagId) {
    try {
       
        const response = await AxiosInstance.delete(`/groups/${id}/tags/${tagId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Edits the invite-only setting for a group by sending a PUT request to the "/groups/{id}" endpoint
async function EditGroupInviteOnlyService(id, inviteOnly) {
    try {
        const response = await AxiosInstance.put(`/groups/${id}`, {inviteOnly });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error editing group invite-only setting");
    }
}


export {
    CreateGroupService,
    GetAllGroupsService,
    GetGroupByIdService,
    JoinGroupService,
    LeaveGroupService,
    InviteJoinGroupService,
    DeclineGroupInviteService,
    CreateGroupLectureNoteService,
    DeleteGroupLectureNoteService,
    EditGroupLectureNoteService,
    GetGroupLectureNotesByIdService,
    CreateCommentService,
    GetAllDatesByGroupIdService,
    UpvoteService,
    DownvoteService,
    GetPersonBranchService,
    AddNoteToPersonalBranchService,
    CreateTagsService,
    DeleteTagService,
    EditGroupInviteOnlyService
}

