import React, { useEffect, useState } from "react";
import { GetGroupByIdService} from "../services/GroupServices";
import { GetAllDiscussionPostsService } from "../services/DiscussionServices";
import { DiscussionCommentSection } from "../components/DiscussionCommentSection";
import { useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { Typography } from "@mui/material";

export default function Discussion(props) {
    const id = useParams().id;
    const { groupId } = useParams();
    const [group, setGroup] = useState({});
    const [discussionPosts, setDiscussionPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState([]);
    
    const handleCancel = () => {
        window.history.back();
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


        <div className="grid grid-cols-3 gap-4 text-center divide-x">
            <div className="divide-y"> 
            <div className="mt-5">
            <h1 className="text-black text-2xl font-regular mb-4 inline mr-5 pr-2">Discussion Posts</h1> 
            <Button className="text-white bg-black hover:bg-gray-700 rounded-md font-light mb-2" onClick={handleCreateDiscussionPost}>New Post</Button>
            </div>
                {
                    discussionPosts&&discussionPosts.map((discussionPost) => (
                        <div className="bg-white p-8 rounded-lg " >
                            <div className="hover:underline font-regular decoration-1 underline-offset-4 text-gray-800 text-xl text-center" onClick={() => setSelectedPost(discussionPost) }>{discussionPost.title}</div>
                            <h1 className="text-gray-800 text-md text-center font-extralight">{discussionPost.content}</h1>
                            {/*{JSON.stringify(discussionPost.comments)}*/}
                        </div>
                    ))
                }
                
            </div>
            <div className="col-span-2">
                <div className="text-gray-800 text-2xl text-left font-regular pl-5 mt-5">{selectedPost.title}</div>
                <div className="text-gray-800 text-lg text-left font-extralight pl-5 mt-3 mb-3">{selectedPost.content}</div>
                {!selectedPost.title && <div className="flex items-center justify-center h-full text-gray-800 text-4xl text-center font-light mt-3 mb-3">Select a post to view</div>}
                {selectedPost.title&& 
                 <DiscussionCommentSection comments={selectedPost.comments} id={selectedPost._id}/> }
            </div>
        </div>

        <div className="text-center m-5">
            <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded font-light text-sm" onClick={handleCancel}>
            Cancel
            </Button>
        </div>
        </>
    )
}
