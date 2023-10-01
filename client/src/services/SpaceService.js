import AxiosInstance from "./AxiosInstance";

async function CreateNoteService(note) {
    try {
        const response = await AxiosInstance.post("spaces/notes", note);
        return response.data;
    } catch (error) {
        console.log(error);
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

export {
    CreateNoteService,
    GetAllNotesService
}

