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

async function DeclineGroupInviteService (groupId) {
    try {
        const response = await AxiosInstance.post(`/groups/decline/${groupId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function CreateGroupLectureNoteService (group, date, content, tags) {
    tags = tags.map((tag) => tag._id);
    try {
        const response = await AxiosInstance.post("/groups/notes", {group,date,content, tags});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function DeleteGroupLectureNoteService (id) {
    try {
        const response = await AxiosInstance.delete(`/groups/notes/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function EditGroupLectureNoteService (id, content) {
    try {
        const response = await AxiosInstance.put(`/groups/notes/${id}`, {content});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


async function GetGroupLectureNotesByIdService (id) {
    try {
        const response = await AxiosInstance.get(`/groups/notes/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function CreateCommentService (id, content) {
    try {
        const response = await AxiosInstance.post(`/groups/notes/${id}/comments`, {content});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function GetAllDatesByGroupIdService (id) {
    try {
        const response = await AxiosInstance.get(`/groups/${id}/dates`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function UpvoteService (id) {
    try {
        const response = await AxiosInstance.post(`/groups/notes/${id}/upvote`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function DownvoteService (id) {
    try {
        const response = await AxiosInstance.post(`/groups/notes/${id}/downvote`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function GetPersonBranchService (id) {
    try {
        const response = await AxiosInstance.get(`/groups/branch/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function AddNoteToPersonalBranchService (noteId) {
    try {
        const response = await AxiosInstance.post(`/groups/branch/${noteId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


async function CreateTagsService (id, tag) {
    try {
        
        const response = await AxiosInstance.post(`/groups/${id}/tags`, {name: tag.name, color: tag.color});
        
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function DeleteTagService (id, tagId) {
    try {
       
        const response = await AxiosInstance.delete(`/groups/${id}/tags/${tagId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


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

