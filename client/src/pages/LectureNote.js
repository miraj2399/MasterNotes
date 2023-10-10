import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetGroupLectureNotesByIdService } from "../services/GroupServices";
import CircleIcon from "@mui/icons-material/Circle";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import ImportExportIcon from "@mui/icons-material/ImportExport";

import Markdown from "react-markdown";
import { IconButton, Typography } from "@mui/material";

export default function LectureNote() {
  const id = useParams().id;
  const [note, setNote] = useState({});
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    GetGroupLectureNotesByIdService(id).then((data) => {
      setNote({
        title: data.content.split("\n")[0],
        content: data.content.split("\n").slice(1).join("\n"),
      });
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

      <div className="mb-10">
        <Markdown className={"prose-lg"}>{note.title}</Markdown>
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
        <div className="flex flex-col items-center justify-center gap-4">
          <div
            onClick={() => setFocusMode(!focusMode)}
            className="flex gap-2 justify-center items-center"
          >
            <CircleIcon sx={{ fontSize: 15, color: "green" }} />
            <Typography variant="h6">Focus Mode</Typography>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <div className="flex gap-2 justify-center items-center">
              <CommentIcon />
              <Typography variant="body">Comments</Typography>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <ThumbUpIcon />
              <Typography variant="body">Like</Typography>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <ThumbDownIcon />
              <Typography variant="body">Dislike</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
