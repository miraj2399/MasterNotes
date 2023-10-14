import React, { useState, useEffect} from "react";
import { CreateCommentService } from "../services/GroupServices";
export default function CommentSection(props){

    const [ currentComments, setCurrentComments ] = useState([]);
    const [ comment, setComment ] = useState("");
    const { comments, noteId } = props;

    useEffect(() => {
        setCurrentComments(comments);
    }
    , []);

    const handleCommentSubmit = () => {
        CreateCommentService(noteId, comment).then((data) => {
            setCurrentComments([...currentComments, data]);
            setComment("");
        })
    }

    const Comment = (props) => {
        const { comment } = props;
        return (
            <div className="flex gap-2">
                <div className="flex flex-col gap-1">
                    <p className="font-bold">{comment.ownerName}</p>
                    <p>{comment.content}</p>
                </div>
            </div>
        )
    }

    const CommentInput = () => {
        return (
            <div className="flex gap-2">
                <input className="border-2 border-gray-300 rounded-md w-full" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..."/>
                <button className="bg-green-500 hover:bg-green-600 text-white rounded-md p-2" onClick={handleCommentSubmit}>Submit</button>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2">
            <CommentInput />
            {currentComments.map((comment) => {
                return <Comment key={comment._id} comment={comment}/>
            })}
        </div>
    )

}