import { GetPersonalNoteByIdService } from "../services/SpaceService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function PersonalNote() {
    const [note, setNote] = useState({});
    const { id } = useParams();
    
    useEffect(() => {
        async function getNote() {
        const note = await GetPersonalNoteByIdService(id);
        setNote(note);
        }
        getNote();
    }, [id]);
    
    return (
        <div className="flex flex-col items-center justify-center">
            <Markdown remarkPlugins={[remarkGfm]} className="prose-lg">
                {note.content}
            </Markdown>
        </div>

    );
    }

