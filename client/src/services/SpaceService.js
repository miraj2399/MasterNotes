import AxiosInstance from "./AxiosInstance";

//Creates a new note by sending a POST request to the "spaces/notes" endpoint
async function CreateNoteService(note) {
    try {
        const response = await AxiosInstance.post("spaces/notes", note);
        return response.data;
    } catch (error) {
        return {error: error.response.data.message}
    }
    }

// Retrieves all notes by sending a GET request to the "spaces/notes" endpoint
async function GetAllNotesService() {
    try {
        const response = await AxiosInstance.get("spaces/notes");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Retrieves a specific note by its ID by sending a GET request to the "spaces/notes/{id}" endpoint
async function GetPersonalNoteByIdService(id) {
    try {
        const response = await AxiosInstance.get(`spaces/notes/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Edits the content of a specific note by sending a PUT request
async function EditNoteService(id, note) {
    try {
        const response = await AxiosInstance.put(`spaces/notes/${id}`, note);
        return response.data;

    } catch (error) {
        console.log(error);

    }
}

//Deletes a specific note by sending a DELETE request to the "spaces/notes/{id}" endpoint
async function DeleteNoteService(id) {
    try {
        const response = await AxiosInstance.delete(`spaces/notes/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}



export {
    CreateNoteService,
    GetAllNotesService,
    GetPersonalNoteByIdService,
    EditNoteService,
    DeleteNoteService
}

