import {
    Card,
    CardBody
  } from "@material-tailwind/react";
  import Markdown from "react-markdown";
  import remarkGfm from "remark-gfm";
  import PersonIcon from '@mui/icons-material/Person';
  import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
  import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
  import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
  export default function LectureNotePreview(props) {
    const { title, content,id,author, upvotes,downvotes, inPersonalBranch=false, 
    } = props;

    return (
      <Card className="mt-6  h-64  m-4 bg-gray-200 hover:bg-gray-300  " 
      onClick={
        () => {
            window.location.href = `/lectureNote/${id}`
        }}
      >
        <CardBody className="  overflow-auto">
          <Markdown className={"prose"} remarkPlugins={[remarkGfm]}>{title.length>30?title.slice(0,30)+"...":title}</Markdown>
          <Markdown className={"prose"} remarkPlugins={[remarkGfm]}>
            {content}
          </Markdown>
          
          <div className="absolute flex  justify-end items-center
          w-full bottom-0 right-0  flex  gap-2 p-2 bg-white  rounded-b-xl">
            
            <PersonIcon sx={{ fontSize: 15, color: "blue" }} />
            <p className="text-sm mr-4">{author}</p>
            <ThumbUpAltIcon sx={{ fontSize: 15, color: "green" }} />
            <p className="text-sm mr-4">{upvotes}</p>
            <ThumbDownAltIcon sx={{ fontSize: 15, color: "gray" }} />
            <p className="text-sm mr-4">{downvotes}</p>
            {inPersonalBranch&&
            <>
            <PlaylistAddCheckIcon sx={{ fontSize: 15, color: "blue" }} />
            <p className="text-sm mr-4">In Personal Branch</p>
            </>}



          </div>
        </CardBody>
      </Card>
    );
  }