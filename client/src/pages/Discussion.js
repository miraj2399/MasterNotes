import React, { useEffect, useState } from "react";
import { GetGroupByIdService} from "../services/GroupServices";
import { DeleteDiscussionPostService, GetAllDiscussionPostsService } from "../services/DiscussionServices";
import { DiscussionCommentSection } from "../components/DiscussionCommentSection";
import { useParams } from "react-router-dom";
import { Button, select } from "@material-tailwind/react";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";

export default function Discussion(props) {
    const id = useParams().id;
    const { groupId } = useParams();
    const [group, setGroup] = useState({});
    const [discussionPosts, setDiscussionPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState([]);
    
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
        setDiscussionPosts(data);
        console.log(data);
    });
  }, [groupId]); 

    return (
        <>
        
         <div class="flex h-52 justify-center items-center bg-cyan-500 bg-opacity-50">
            {group&&
            <div class="text-center">
                <h1 color="blue-gray" className="hover:text-gray-600 text-gray-800 text-4xl text-center font-extralight mb-3">{group.name}</h1>
                <h1 color="blue-gray" className="hover:text-gray-600 text-gray-800 text-xl text-center font-extralight mb-3">{group.courseTitle}</h1>
                <h1 color="blue-gray" className="hover:text-gray-600 text-gray-800 text-xl text-center font-extralight">Discussion</h1>
            </div>
            }
        </div>


        <div className="grid grid-cols-3 gap-4 divide-x">
            <div className="text-center divide-y"> 
            <div className="mt-5">
            <h1 className="text-black text-2xl font-regular mb-4 inline mr-5 pr-2">Discussion Posts</h1> 
            <Button className="text-white bg-black hover:bg-gray-700 rounded-md font-light mb-2" onClick={handleCreateDiscussionPost}>New Post</Button>
            </div>
                {
                    discussionPosts&&discussionPosts.map((discussionPost) => (
                        <div className="flex items-center justify-center pt-5 pb-5 pl-5 pr-5 hover:bg-gray-400" 
                        onClick={() => setSelectedPost(discussionPost)}
                        >
                        <div className="hover:bg-gray-400 rounded-lg max-h-32 overflow-clip">
                            <div className="hover:underline font-regular decoration-1 underline-offset-4 text-gray-800 text-xl text-center" >{discussionPost.title}</div>
                            <h1 className="text-gray-800 text-md text-center font-extralight">{discussionPost.content}</h1>
                            {/*{JSON.stringify(discussionPost.comments)}*/}
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
                <div className="text-gray-800 text-lg text-left font-extralight pl-5 mt-1 mb-3 mr-5">{selectedPost.content}</div>
            
                {selectedPost.owner && 
                <>
                <div className="flex items-left ml-5">
                <p className="inline-block items-left mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    {selectedPost.owner.firstName} {selectedPost.owner.lastName}</p>
                <p class="inline-block items-left text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                        title="February 8th, 2022">{
                                new Date(selectedPost.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })
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
        </>
    )
}
