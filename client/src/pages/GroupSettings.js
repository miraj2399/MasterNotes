import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GetGroupByIdService,CreateTagsService,DeleteTagService
} from '../services/GroupServices';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { HexColorPicker } from "react-colorful";



import { Button, Chip, Icon, IconButton } from '@mui/material';

export default function GroupSettings() {
    const { id } = useParams();
    const [group, setGroup] = useState();
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState({});
    const [addTag, setAddTag] = useState(false);
    const [color, setColor] = useState("#00fef3");

    useEffect(() => {
        GetGroupByIdService(id).then((data) => {
            setGroup(data);
            data.tags? setTags(data.tags): setTags([]);
        });
    }, []);

    const handleSave = () => {
        CreateTagsService(id, tags).then((data) => {
            window.location.href = `/group/${id}`;
        });
        window.location.href = `/groupsettings/${id}`;
    }


    return (
        group && (
            <div className="grid gap-2 w-full">
                <p className="text-gray-900 font-bold text-2xl mx-5">Tags</p>
                <div className="grid gap-2 items-center justify-center">
                    
                    {tag && tags.map((tag) => (
                        <div className="flex gap-2 items-center justify-center">
                        <div className="flex-1">
                        <Chip label={tag.name} 
                        sx={{background: tag.color, color:"white" }}
                        />
                        </div>
                        <IconButton>
                            <DeleteIcon color='error'
                            onClick={() => DeleteTagService(id, tag._id).then((data) => {
                                window.location.href = `/groupsettings/${id}`;

                            }
                            )}
                            />
                        </IconButton>
                        </div>
                    ))}
                    {addTag && (
                    <div className="flex gap-2 items-center justify-center">
                        <input className="border-2 border-gray-300 rounded-lg p-2 w-1/2" placeholder="Tag Name" 
                        style={{background: color, color:"white"}}
                        onChange={(e) => setTag({...tag, name: e.target.value})}
                        />
                        <HexColorPicker color={color} onChange={setColor}
                         />
                        <IconButton 
                        onClick={() => setTags([...tags, {name: tag.name, color: color}])}
                        >
                            <AddIcon color='success'/>
                        </IconButton>

                    </div>
                    )}
                    {!addTag && (
                        
                    <div className="flex gap-2 items-center justify-center">
                        <div className="flex-1">
                            <p className="text-gray-900 font-semi-bold text-lg mx-5">Add Tag</p>
                        </div>
                        <IconButton onClick={
                            () => setAddTag(!addTag)
                        }>
                            <AddIcon color='success'/>
                        </IconButton>
                        
                        </div>
                    )}

                    {addTag && (
                    <div className="flex gap-2 items-center justify-center">
                        <Button variant="contained" color="success"
                        onClick={() => handleSave()
                        }

                        >Save</Button>
                        <Button variant="contained" color="error" onClick={() => window.location.href = `/groupsettings/${id}`}>Cancel</Button>
                    </div>

                    )
                        }

                    </div>
                    
                </div>
        )
    )
}