import { CreateDiscussionCommentService, DeleteDiscussionCommentService } from "../services/DiscussionServices";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";

function handleDeleteComment(comment) {
    DeleteDiscussionCommentService(comment._id);
};


const DiscussionCommentSection = (props) => {
    const { comments, id } = props;
    return (
        <div className="flex flex-col gap-2">
            <CommentInput id={id}/>
            {comments&& comments.length>0 && comments.map((comment) => {
                return <Comment key={comment._id} comment={comment}/>
            })}
        </div>
    )
  }
  
  const Comment = (props) => {
    const { comment} = props;
    return (
        <article class="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
                <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                        class="mr-2 w-6 h-6 rounded-full"
                        src={comment.owner&&comment.owner.profilePicture ? comment.owner.profilePicture : "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"}
                        alt="Anonymous"/>
                        {comment.owner.firstName && comment.owner.lastName ? `${comment.owner.firstName} ${comment.owner.lastName}` : "Anonymous"}
                            </p>
                <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                        title="February 8th, 2022">{
                                new Date(comment.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })
                        }
                            </time></p>
                </div>


            {comment.owner && comment.owner._id === localStorage.getItem("user_id") &&
            <>
                  <div className="inline-block gap-2">
                  <IconButton className=""
                    onClick={() => { DeleteDiscussionCommentService(comment._id) }}
                  >
                    <DeleteIcon/>
                 </IconButton>
                  </div>
              </>
            }
            
            
        </footer>
        <p class="text-gray-600 font-light text-left dark:text-gray-400">{comment.content}</p>
    </article>
    )
  }
  
  const CommentInput = (props) => {
    const { id } = props;
    const [comment, setComment] = useState("");
    const handleCommentSubmit = () => {
        CreateDiscussionCommentService(id, comment).then((data) => {
            setComment("");
            //window.location.reload();
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className="grid gap-2 p-3">
            <textarea className="border-2 border-gray-200 rounded-md p-2 w-full flex" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            <button className=" 
            bg-cyan-500 hover:bg-cyan-400 bg-opacity-50 text-black font-light font-bold py-2 px-4 rounded
            " onClick={handleCommentSubmit}>Add Comment</button>
        </div>
    )
  }

export {
    DiscussionCommentSection
} 


