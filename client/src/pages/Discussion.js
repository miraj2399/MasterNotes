import React, { useEffect, useState } from "react";
import { GetGroupByIdService} from "../services/GroupServices";
import { DeleteDiscussionPostService, GetAllDiscussionPostsService, DeleteDiscussionCommentService , CreateDiscussionCommentService} from "../services/DiscussionServices";

import { useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import ReplyIcon from '@mui/icons-material/Reply';
import {Snackbar} from "@mui/material";

export default function Discussion(props) {
    const { groupId } = useParams();
    const [group, setGroup] = useState({});
    const [discussionPosts, setDiscussionPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    
    
    
    const DiscussionCommentSection = (props) => {
        const { comments, id } = props;
        return (
            <div className="flex flex-col gap-2 mt-8">
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
                setSelectedPost(data);
               
                setDiscussionPosts(discussionPosts.map((discussionPost) => {
                    if(discussionPost._id === id) {
                        return data;
                    }
                    return discussionPost;
                }
                ))
                setMessage("Comment added successfully");
                setOpen(true);

                
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
   
    
    const handleCancel = () => {
        window.history.back();
      };

    const handleDeleteNote = () => {
        console.log(selectedPost._id);
        DeleteDiscussionPostService(selectedPost._id);
    };

    
    const handleCreateDiscussionPost = () => {
        window.location.href = `/createDiscussionPost/${group._id}`
    };

    useEffect(() => {
    GetGroupByIdService(groupId).then((data) => {
      setGroup(data);
    });
    GetAllDiscussionPostsService(groupId).then((data) => {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setDiscussionPosts(data);

        
    }
    
    );
  }, [groupId]); 

    return (
        <>
        
         <div class="flex h-52 justify-center items-center bg-cyan-500 bg-opacity-50">
            {group&&
            <div class="text-center">
                <h1 color="blue-gray" className="hover:text-gray-600 text-gray-800 text-4xl text-center font-extralight mb-3">{group.name}</h1>
                <h1 color="blue-gray" className="hover:text-gray-600 text-gray-800 text-xl text-center font-extralight mb-3">{group.courseTitle}</h1>
                <h1 color="blue-gray" className="hover:text-gray-600 text-gray-900 text-xl text-center  ">Discussion</h1>
            </div>
            }
        </div>


        <div className="grid grid-cols-3 gap-4 divide-x mt-8 gap-8">
            <div className="col-span-3 text-center"> 
            <div className="flex flex-col items-center justify-center">
            <Button className="text-white bg-green-500 hover:bg-green-600 rounded-md font-light" onClick={handleCreateDiscussionPost}>New Post</Button>
            </div>
            </div>
            
            <div className="text-center col-span-1">
                
                {
                    
                    discussionPosts&&discussionPosts.map((discussionPost) => (
                        <div className="flex items-center justify-center ml-2 p-4 hover:bg-gray-400 border-b-2 hover:border-none" 
                        onClick={() => setSelectedPost(discussionPost)}
                        >
                        {discussionPost.comments.length>0&&
                        <div className=" relative w-10 h-10  overflow-hidden  ">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-800 text-lg font-extralight">
                            <ReplyIcon size="sm"/>
                            {discussionPost.comments.length}
                            </div>
                        </div>
                        }

                        <div className="hover:bg-gray-400 w-full h-24 overflow-y-auto ">
                            <div className=" font-regular decoration-1 underline-offset-4 text-gray-800 text-xl text-center" >{discussionPost.title}</div>
                            <div className="text-gray-800 text-lg text-center font-extralight mt-1 mb-3 ">{discussionPost.content}</div>
                        </div>
                        

                        </div>
                    ))
                }
                
            </div>
            <div className="col-span-2">
                <div className="flex justify-between"
                >
                <div className=" text-gray-800 text-2xl text-left font-regular pl-5 mt-5"
                >{selectedPost.title}</div>
                {selectedPost.owner && selectedPost.owner._id === localStorage.getItem("user_id") &&
            <>
                  <div className="pl-5 mt-4 mr-5">
                  <IconButton className="text-right"
                  onClick={handleDeleteNote}
                  >
                 <DeleteIcon /> </IconButton>
                  </div>
              </>
            }
                </div>
                <div className="ml-4">
                <Markdown className={"prose-lg"} 
                remarkPlugins={[remarkGfm]}
                >{selectedPost.content}</Markdown>
                </div>
            
                {selectedPost.owner && 
                <>
                <div className="flex items-left ml-5 mt-8">
                <p className="inline-block items-left mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    {selectedPost.owner.firstName} {selectedPost.owner.lastName}</p>
                <p class="inline-block items-left text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                        title="February 8th, 2022">{
                                new Date(selectedPost.createdAt).toLocaleDateString() === new Date().toLocaleDateString() ?
                                "Today" :
                                new Date(selectedPost.createdAt).toLocaleDateString() === new Date(Date.now() - 86400000).toLocaleDateString() ?
                                "Yesterday" :
                                new Date(selectedPost.createdAt).getTime() > Date.now() - 604800000 ?
                                new Date(selectedPost.createdAt).toLocaleDateString(undefined, { weekday: 'long' }) :
                                new Date(selectedPost.createdAt).toLocaleDateString()
                        }
                            </time></p> </div>
                </>}
                {!selectedPost.title && <div className="flex items-center justify-center h-96 text-gray-800 text-4xl text-center font-light mt-3 mb-3">Select a post to view</div>}
                {selectedPost.title&& 
                 <DiscussionCommentSection comments={selectedPost.comments} id={selectedPost._id}/> }
            </div>
        </div>

        <div className="text-center m-5">
            <Button className="bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded font-light text-sm" onClick={handleCancel}>
            Back
            </Button>
        </div>
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={message}
        />
        </>
    )
}
