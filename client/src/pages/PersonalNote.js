import { GetPersonalNoteByIdService } from "../services/SpaceService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import EditIcon from "@mui/icons-material/Edit";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import remarkGfm from "remark-gfm";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteNoteService } from "../services/SpaceService";

// Functional component for displaying a personal note
export default function PersonalNote() {
    const [note, setNote] = useState({});
    const [showMoreExpand, setShowMoreExpand] = useState(false);
    const { id } = useParams();
    // useEffect hook to fetch the note based on its ID
    useEffect(() => {
        async function getNote() {
            const note = await GetPersonalNoteByIdService(id);
            setNote(note);
        }
        getNote();
    }, [id]);

    return (
        <div className="flex flex-col items-center justify-center">

            < div className="flex flex-row gap-2 items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Last updated at {new Date(note.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}</p>
                {/* Button/icon for expanding options */}

                <IconButton onClick={() => { setShowMoreExpand(!showMoreExpand) }}>
                    <MoreVertIcon />
                </IconButton>
                {showMoreExpand && <div className="relative right-0 top-0 flex  gap-4 p-2 bg-white dark:bg-gray-800">
                    <div>
                        <IconButton onClick={() => {
                            setShowMoreExpand(false)
                            window.location.href = `/personalNote/${id}/edit`;

                        }}>
                            <EditIcon />
                        </IconButton>
                        Edit
                    </div>

                    <div>
                        <IconButton onClick={() => {
                            setShowMoreExpand(false)
                            DeleteNoteService(id).then((data) => {
                                window.location.href = "/spaces";

                            })
                        }
                        }>
                            <DeleteIcon />
                        </IconButton>
                        Delete
                    </div>
                </div>}


            </div>
            {/* Displaying the content of the note using Markdown */}

            <div className="m-3">
                <Markdown remarkPlugins={[remarkGfm]} className="prose-lg">
                    {note.content}
                </Markdown>
            </div>


        </div>

    );
}

