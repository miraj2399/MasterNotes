import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetGroupLectureNotesByIdService,
  DeleteGroupLectureNoteService,
  UpvoteService,
  DownvoteService,
  AddNoteToPersonalBranchService
 } from "../services/GroupServices";
import CircleIcon from "@mui/icons-material/Circle";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ImportExportIcon from "@mui/icons-material/ImportExport";
import CollectionsIcon from '@mui/icons-material/Collections';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import CommentSection from "../components/CommentSection";


import Markdown from "react-markdown";
import { Button, IconButton, Typography } from "@mui/material";


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





export default function LectureNote() {
  const id = useParams().id;
  const [note, setNote] = useState({});
  const [focusMode, setFocusMode] = useState(false);
  const [showMoreExpand, setShowMoreExpand] = useState(false);

  const handleAddToPersonalBranch = () => {
    
    AddNoteToPersonalBranchService(id).then((data) => {
      window.location.href = "/group/" + note.group;
    })

    setShowMoreExpand(false);
    }
  
  const handleAddToSpace = () => {
    // write the logic here
    setShowMoreExpand(false);
    }

  const handleEditNote = () => {
    setShowMoreExpand(false);
    window.location.href = `/lectureNote/${id}/edit`;
  }

  const handleDeleteNote = () => {
    setShowMoreExpand(false);
    DeleteGroupLectureNoteService(id).then((data) => {
      window.location.href = "/group/" + note.group;
    })
  }

  const handleUpvote = () => {
    UpvoteService(id).then((data) => {
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    }
    );
  }

  const handleDownvote = () => {
    DownvoteService(id).then((data) => {
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    }
    );
  }



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
    
        <div className="flex gap-2 justify-center items-center m-2">
          <div  className="flex justify-center items-center gap-2">
          <PersonOutlineIcon />
          {note.owner&& note.owner.firstName && note.owner.lastName ? `${note.owner.firstName} ${note.owner.lastName}` : "Anonymous"}
          </div>

          <div className="flex justify-center items-center gap-2">
          <CalendarTodayIcon />
          <p>{new Date(note.createdAt).toLocaleDateString()}</p>
        </div>
        </div>

        {/* Make it a component  later */}
        <div className="grid  grid-cols-4 gap-2 justify-center items-center">

          <div class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">recitation1</div>
          <div class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">tue</div>
          <div class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">section3</div>
          <div class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Green</div>
</div>

        {/* Make it a component  later */}
        <div className="flex gap-2 justify-center items-center">
          <p>{note.upvotes}</p>
          <IconButton onClick={handleUpvote}>
            {
              note.upvoted ? <ThumbUpIcon color="primary" /> : <ThumbUpIcon />
            }
          </IconButton>
          <p className="ml-8">{note.downvotes}</p>
          <IconButton onClick={handleDownvote}>
            {note.downvoted ? <ThumbDownIcon color="primary" /> : <ThumbDownIcon />}
          </IconButton>
          
          <p className="ml-8">{note.comments&& note.comments.length}</p>
          <IconButton>
            <CommentIcon />
          </IconButton>
  

          <IconButton>
            <MoreVertIcon
            onClick={() => setShowMoreExpand(!showMoreExpand)}
            />
          </IconButton>
          {
            showMoreExpand && (
              // make them abosolute
              <div className="bg-white rounded-md shadow-md p-2 flex flex-col gap-2">
                <div className="flex gap-2 justify-center items-center">
                  <Button variant="text" startIcon={<ImportExportIcon />}
                  onClick={handleAddToPersonalBranch}
                  >
                    Add to Personal branch
                  </Button>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <Button variant="text" startIcon={<CollectionsIcon/>}
                  onClick={handleAddToSpace}
                  >
                    Add to space
                  </Button>
                  </div>
              
                   {note.owner && note.owner._id === localStorage.getItem("user_id") && 
                (<>
                  <div className="flex gap-2 justify-center items-center">
                  <Button variant="text" startIcon={<Edit/>}
                  onClick={handleEditNote}
                  >
                    Edit
                  </Button>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                  <Button variant="text" startIcon={<Delete/>}
                  onClick={handleDeleteNote}
                  >
                    Delete
                  </Button>
                  </div>
                </>
                )}

              </div>
            )
          }
          </div>
        <CommentSection comments={note.comments} noteId={note._id}/>
        </div>
      </div>
    </div>
  );
}
