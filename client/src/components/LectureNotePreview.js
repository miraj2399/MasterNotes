import {
    Card,
    CardBody
  } from "@material-tailwind/react";
  import Markdown from "react-markdown";
  import remarkGfm from "remark-gfm";
  export default function LectureNotePreview(props) {
    const { title, content,id} = props;

    return (
      <Card className="mt-6 w-64 h-64 m-4 bg-gray-200 hover:bg-gray-300" 
      onClick={
        () => {
            window.location.href = `/lectureNote/${id}`
        }}
      >
        <CardBody className=" overflow-auto">
          <Markdown className={"prose"} remarkPlugins={[remarkGfm]}>{title.length>30?title.slice(0,30)+"...":title}</Markdown>
          <Markdown className={"prose"} remarkPlugins={[remarkGfm]}>
            {content}
          </Markdown>
        </CardBody>
      </Card>
    );
  }