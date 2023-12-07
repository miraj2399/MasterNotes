import { GetGroupLectureNotesByIdService, GetAllDatesByGroupIdService, EditGroupLectureNoteService } from "../services/GroupServices"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Autocomplete } from "@mui/material";
import TextField from '@mui/material/TextField';


export default function EditLectureNote() {
    const id = useParams().id;
    const [note, setNote] = useState({});
    const [content, setContent] = useState("");
    useEffect(() => {
        const getNote = async () => {
            const note = await GetGroupLectureNotesByIdService(id);
            setNote(note);
            setContent(note.content);
        }
        getNote();
    }, [id]);

    function handleSave(){
        EditGroupLectureNoteService(id, content).then((data) => {   
            window.location.href = `/lectureNote/${id}`;
        }
        ).catch((err) => {
            console.log(err);
        }
        );
    }

    

    return (
        <div>
            <div className="grid gap-2 w-full">
                <h1 className="text-2xl font-bold">Edit Lecture Note</h1>
                < textarea className="border-2 border-gray-300 rounded-lg p-2 w-1/2" rows="10" cols="50" defaultValue={content}
                onChange={(e) => setContent(e.target.value)}
                 />
                
                <div className="flex gap-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleSave()}
                    >
                        Save
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => window.location.href = `/lectureNote/${id}`}
                    >
                        Cancel
                    </button>
                </div>
            </div>
            
            
        </div>
    )
}