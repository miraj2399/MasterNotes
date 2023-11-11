
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { GetGroupByIdService, CreateTagsService,DeleteTagService, EditGroupInviteOnlyService } from "../services/GroupServices";
import { Button, Checkbox} from "@material-tailwind/react";
import {IconButton} from "@mui/material";
import { TextField, Snackbar,Chip } from "@mui/material";
import { HexColorPicker } from "react-colorful";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';



export default function GroupSettings() {

    const [group, setGroup] = useState({});
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState({name: "", color: ""});
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [tagColor, setTagColor] = useState("#f3b3b3");
    const [inviteOnly, setStatus] = useState();

    const color = "#fff"
    const { id } = useParams();

    useEffect(() => {
        GetGroupByIdService(id).then((data) => {
            setGroup(data);
            console.log(data);
            setTags(data.tags);
            setStatus(data.inviteOnly);
        });
    }
    , []);

   


 

    const handleCheckboxChange = async (inviteOnlyStatus) => {
        try {
          await EditGroupInviteOnlyService(group._id, 
            inviteOnlyStatus
            ).then((data) => {
                setOpen(true);
                setMessage(data.message);
            });
          console.log("Group invite-only setting updated successfully");
        } catch (error) {
          console.error("Error updating group invite-only setting", error);
          // Handle the error in your application (e.g., show an error message to the user)
        }
      };

  return(
        <>
        <div className="bg-white p-8 rounded-lg ">
            <p className="text-4xl font-extrabold text-blue-700 tracking-wide">Group Settings</p>
            <p className="text-2xl font-extrabold text-blue-700 tracking-wide mt-20 mb-10">Visibility</p>
            <div>
              <Checkbox
                label="Invite only"
                name="inviteOnly"
                checked={inviteOnly === true}
                onChange={ () => {
                    setStatus(!inviteOnly)
                    handleCheckboxChange(!inviteOnly);
                }
                }
                />
              <Checkbox
                label="Public"
                name="public"
                checked={inviteOnly === false}
                onChange={() => {
                    setStatus(!inviteOnly)
                    handleCheckboxChange( inviteOnly === false ? true : false)
                }
                }
                />
            </div>
            <p className="text-2xl font-extrabold text-blue-700 tracking-wide mt-20 mb-10">Tags</p>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div>
                {tags.map((tag) => (
                    <div className="flex  items-center gap-2">
                        <Chip label={tag.name} sx={{ backgroundColor: tag.color, color: color }} />
                        <div className="flex-grow"></div>
                        <div className="mr-64">
                        <IconButton onClick={() => {
                            DeleteTagService(id, tag._id).then((data) => {
                                setOpen(true);
                                setMessage(data.message);
                            });
                            window.location.reload();
                        }
                        }>
                            <DeleteIcon color="error"/>
                        </IconButton>
                        </div>

                    </div>
                ))}
                </div>

<div className="flex flex-row items-center gap-2">
                <TextField
                    label= " tag name"
                    variant="standard"
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
                    color= "green"
                    onClick={() => {
                        CreateTagsService(id, 
                            tag
                            ).then((data) => {
                            setOpen(true);
                            setMessage(data.message);
                            
                        });
                        window.location.reload();
                    }}
                    className="px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md">
                    Create
                </Button>
            </div>
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

