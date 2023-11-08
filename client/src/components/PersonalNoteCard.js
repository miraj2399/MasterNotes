import {
    Card,
    CardBody,
  } from "@material-tailwind/react";
  import Markdown from "react-markdown";
  import remarkGfm from "remark-gfm";
  export default function PersonalNoteCard(props) {
    const { note } = props;
    const title = note.content.split("\n")[0];
    const content = note.content.split("\n").slice(1).join("\n");
    const id = note._id;
    return (
      <Card className="w-128 h-64 m-4 bg-cyan-500 bg-opacity-50 hover:bg-opacity-100">
        <CardBody className=" overflow-auto">
          <Markdown className={"prose"} remarkPlugins={[remarkGfm]}>{title.length>30?title.slice(0,30)+"...":title}</Markdown>
          <Markdown className={"prose"} remarkPlugins={[remarkGfm]}>
            {content}
          </Markdown>
        </CardBody>
      </Card>
    );
  }