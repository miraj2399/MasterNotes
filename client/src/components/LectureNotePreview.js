import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import Markdown from "react-markdown";
  export default function LectureNotePreview(props) {
    const { title, content,id} = props;

    return (
      <Card className="mt-6 w-96 h-64">
        <CardBody className="h-[60%] overflow-auto">
          <Markdown className={"prose"}>{title.length>30?title.slice(0,30)+"...":title}</Markdown>
          <Markdown className={"prose"}>
            {content}
          </Markdown>
        </CardBody>
        <CardFooter className="pt-2 mt-3">
          <Button
          onClick={() => {
            window.location.href = `/lectureNote/${id}`
            }}
          >Read More</Button>
        </CardFooter>
      </Card>
    );
  }