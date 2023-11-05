
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { GetGroupByIdService, CreateTagsService,DeleteTagService } from "../services/GroupServices";
import { Button} from "@material-tailwind/react";
import { TextField, Snackbar,Chip } from "@mui/material";
import { HexColorPicker } from "react-colorful";


export default function GroupSettings() {

    const [group, setGroup] = useState({});
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState({name: "", color: ""});
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [tagColor, setTagColor] = useState("#f3b3b3");
    const color = "#fff"
    const { id } = useParams();

    useEffect(() => {
        GetGroupByIdService(id).then((data) => {
            setGroup(data);
            console.log(data);
            setTags(data.tags);
        });
    }
    , []);


  return(
        <>
        <div className="bg-white p-8 rounded-lg ">
            <p className="text-4xl font-extrabold text-blue-700 tracking-wide">Group Settings</p>
            <p className="text-2xl font-extrabold text-blue-700 tracking-wide">Tags</p>
            <div className="grid grid-cols-1 gap-2">
                {tags.map((tag) => (
                    <div className="flex flex-row items-center gap-2">
                        <Chip label={tag.name} sx={{ backgroundColor: tag.color, color: color }} />
                        <div className="flex-grow"></div>
                        <Button
                            
                            color="red"
                            onClick={() => {
                                DeleteTagService(id, tag._id).then((data) => {
                                    setOpen(true);
                                    setMessage(data.message);
                                });
                                window.location.reload();
                            }}
                            className="px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md">
                            Delete
                        </Button>
                    </div>
                ))}
            </div>

            <div className="flex flex-row items-center gap-2">
                <TextField
                    label="New Tag"
                    variant="outlined"
                    value={tag.name}
                    
                    sx={{ background: tagColor,
                        
                    }}
                    onChange={(e) => {
                        setTag({...tag, name: e.target.value});
                    }}
                />
                <HexColorPicker color={tagColor} onChange={
                    (color) => {
                        setTagColor(color);
                        setTag({...tag, color: color});
                    }
                } />
                <Button
                    color="blue"
                    onClick={() => {
                        CreateTagsService(id, 
                            tag
                            ).then((data) => {
                            setOpen(true);
                            setMessage(data.message);
                            
                        });
                        window.location.reload();
                    }}
                    className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md">
                    Create
                </Button>
            </div>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message={message}
                key={"top" + "center"}
            />
        </div>

        </>
  )
}

