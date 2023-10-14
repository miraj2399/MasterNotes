import AxiosInstance from "./AxiosInstance";

async function CreateNoteService(note) {
    try {
        const response = await AxiosInstance.post("spaces/notes", note);
        return response.data;
    } catch (error) {
        return {error: error.response.data.message}
    }
    }

async function GetAllNotesService() {
    try {
        const response = await AxiosInstance.get("spaces/notes");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function GetPersonalNoteByIdService(id) {
    try {
        const response = await AxiosInstance.get(`spaces/notes/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export {
    CreateNoteService,
    GetAllNotesService,
    GetPersonalNoteByIdService
}

