import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetGroupLectureNotesByIdService } from "../services/GroupServices";
import CircleIcon from "@mui/icons-material/Circle";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { CreateCommentService } from "../services/GroupServices";


import Markdown from "react-markdown";
import { IconButton, Typography } from "@mui/material";

const FocusModeButton = (props) => {
  const { focusMode, setFocusMode } = props;
  return (
    <div className="flex gap-2 justify-center items-center" onClick={
      () => setFocusMode(!focusMode)
    }>
      <CircleIcon sx={{ fontSize: 15, color: "green" }} />
      <Typography variant="h6">Focus Mode</Typography>
      </div>
  );
}
const CommentSection = (props) => {
  const { comments, noteId } = props;
  return (
      <div className="flex flex-col gap-2">
          <CommentInput noteId={noteId}/>
          {comments&& comments.length>0 && comments.map((comment) => {
              return <Comment key={comment._id} comment={comment}/>
          })}
      </div>
  )
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

const CommentInput = (props) => {
  const { noteId } = props;
  const [comment, setComment] = useState("");
  const handleCommentSubmit = () => {
      CreateCommentService(noteId, comment).then((data) => {
          setComment("");
          window.location.reload();
      })
  }
  return (
      <div className="flex gap-2">
          <input className="border-2 border-gray-300 rounded-md w-full" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..."/>
          <button className="bg-green-500 hover:bg-green-600 text-white rounded-md p-2" onClick={handleCommentSubmit}>Submit</button>
      </div>
  )
}


export default function LectureNote() {
  const id = useParams().id;
  const [note, setNote] = useState({});
  const [focusMode, setFocusMode] = useState(false);


  useEffect(() => {
    GetGroupLectureNotesByIdService(id).then((data) => {
      setNote(data)
    });
  }, []);
  return focusMode ? (
    <div className="flex flex-col items-center justify-center p-10">
      <div
        onClick={() => setFocusMode(!focusMode)}
        className="flex gap-2 justify-center items-center"
      >
        <CircleIcon sx={{ fontSize: 15, color: "red" }} />
        <Typography variant="h6">Exit Focus Mode</Typography>
      </div>

    <Markdown className={"prose-lg"}>{note.content}</Markdown>
    </div>
  ) : (
    <div className="grid md:grid-cols-6 gap-4 p-10">
      <div className="md:col-span-4">
        <div className="mb-10">
          <Markdown className={"prose-lg"}>{note.title}</Markdown>
        </div>
        <Markdown className={"prose-lg"}>{note.content}</Markdown>
      </div>
      <div className="md:col-span-2">
        <div className="grid gap-2">
        <FocusModeButton focusMode={focusMode} setFocusMode={setFocusMode} />
        <CommentSection comments={note.comments} noteId={note._id}/>
        </div>
      </div>
    </div>
  );
}
