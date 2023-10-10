import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { GetGroupLectureNotesByIdService } from "../services/GroupServices"
import Markdown from "react-markdown";
export default function LectureNote() {
    const id = useParams().id;
    const [note, setNote] = useState({});

    useEffect(() => {

        GetGroupLectureNotesByIdService(id).then((data) => {
            
            setNote({

                title: data.content.split("\n")[0],
                content: data.content.split("\n").slice(1).join("\n")
            })
           
        })
    }, [])
    return (
        <div className="grid gap-10 justify-center items-center ">
            <Markdown className={"prose"}>
                {note.title}
            </Markdown>
            <Markdown className={"prose"}>
                {note.content}
            </Markdown>

        </div>
    )
}