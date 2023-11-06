import React, { useEffect, useState } from "react";
import { GetGroupByIdService} from "../services/GroupServices";
import { GetAllDiscussionPostsService, CreateDiscussionPostService } from "../services/DiscussionServices";
import { useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";

export default function Discussion(props) {
    const { groupId } = useParams();
    const [group, setGroup] = useState({});
    const [discussionPosts, setDiscussionPosts] = useState([]);
    
    const handleCancel = () => {
        window.history.back();
      };
    
    const handleCreateDiscussionPost = () => {
        window.location.href = '/createDiscussionPost';
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


        <div className="grid grid-cols-4 gap-4 text-center">
            <div>
                {
                    discussionPosts&&discussionPosts.map((discussionPost) => (
                        <div className="bg-white p-8 rounded-lg ">
                            <h1 className="hover:text-green-500 text-gray-800 text-4xl text-center font-extralight">{discussionPost.title}</h1>
                            <h1 className="hover:text-green-500 text-gray-800 text-xl text-center font-extralight">{discussionPost.content}</h1>
                            {JSON.stringify(discussionPost.comments)}
                        </div>
                    ))
                }
                
                <Button onClick={handleCreateDiscussionPost}>New Post</Button>
            </div>
            <div>
                selected question 
            </div>
        </div>

        <div className="text-center m-5">
            <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleCancel}>
            Cancel
            </Button>
        </div>
        </>
    )
}
