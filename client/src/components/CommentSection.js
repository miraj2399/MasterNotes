import { CreateCommentService } from "../services/GroupServices";
import { useState } from "react";

/**
 * Functional component representing a section for displaying comments.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Array} comments - An array of comments to be displayed.
 * @param {string} noteId - The unique identifier of the note associated with the comments.
 */
const CommentSection = (props) => {
    const { comments, noteId } = props;
    /**
     * CommentSection component
     * Displays a comment input form and renders individual comments.
     */
    return (
        <div className="flex flex-col gap-2 divide-y">
            <CommentInput noteId={noteId}/>
            {comments&& comments.length>0 && comments.map((comment) => {
                return <Comment key={comment._id} comment={comment}/>
            })}
        </div>
    )
  }
  
/**
 * Functional component representing an individual comment.
 *  @param {Object} props - The properties passed to the component.
 *  @param {Object} comment - The comment object containing details about the comment.
 */
  const Comment = (props) => {
    const { comment} = props;
    /**
     * Comment component
     * Displays information about the comment, including owner details, timestamp, and content.
     */
    return (
        <article class="pt-4 pb-4 text-base bg-white rounded-lg dark:bg-gray-900">
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
            
            
        </footer>
        <p class="text-gray-500 dark:text-gray-400">{comment.content}</p>
    </article>
    )
  }

/**
 * Functional component representing an input form for submitting comments.
 *  @param {Object} props - The properties passed to the component.
 *  @param {string} noteId - The unique identifier of the note associated with the comments.
 */
  const CommentInput = (props) => {
    const { noteId } = props;
    const [comment, setComment] = useState("");
    const handleCommentSubmit = () => {
        CreateCommentService(noteId, comment).then((data) => {
            setComment("");
            window.location.reload();
        })
    }

    /**
     * CommentInput component.
     * Provides a textarea for entering comments and a button for submission.
     */
    return (
        <div className="grid gap-2">
            <textarea className="border-2 border-gray-200 rounded-md p-2 w-full flex" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            <button className=" 
            bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded
            " onClick={handleCommentSubmit}>Submit</button>
        </div>
    )
  }

export default CommentSection;


