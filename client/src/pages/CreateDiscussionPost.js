import React, { useEffect, useState } from "react";
import { Tabs, Tab, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Textarea, Input, Label } from "@material-tailwind/react";
import Markdown from "react-markdown";
import { Grid } from "@mui/material";
import { Snackbar } from "@mui/material";
import AllowTab from '../utilities/AllowTabinTextArea';
import remarkGfm from 'remark-gfm'
import { CreateDiscussionPostService } from '../services/DiscussionServices';
import { GetGroupByIdService} from "../services/GroupServices";
import { useParams } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CreateDiscussionPost(props) {
  const [value,setValue] = useState(0);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const id = useParams().groupId;
  const { groupId } = useParams();
  const [group, setGroup] = useState({});

  useEffect(() => {
  GetGroupByIdService(groupId).then((data) => {
    setGroup(data);
  });
}, [groupId]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ButtonBar = () => {
    const handleCancel = () => {
        window.history.back();
      };
    const handlePublish = () => {
        CreateDiscussionPostService(group._id, title, text).then((data) => { // create discussion post service 
            if(data.error) {
                setMessage(data.error);
                setOpen(true);
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 1000);
            }
            else {
                setMessage(data.message);
                setOpen(true);
                window.history.back();
            }
        }
        );
        };

        
    return (
      <div className="flex justify-end gap-2">
        
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleCancel}>
          Cancel
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handlePublish}>
          Publish
        </button>
      </div>
    );
  };



  return (
    <Box sx={{ width: "100%" }}>
        <h1 className="text-4xl font-regular text-green-700 tracking-wide text-center mt-5 mb-2">Create Discussion Post</h1>
        <p className="text-gray-600 text-center font-light mb-5 text-lg">Write your question here</p>
        <br />
        <div className="w-full flex justify-center items-center pl-5 mb-5 pr-5">
        <Input 
            label="Title" 
            onChange={(e) => {
                setTitle(e.target.value);
            }}
            value={title}
        />
        </div>
       
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
            value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Write" {...a11yProps(0)} />
          <Tab label="Preview" {...a11yProps(1)} />
          <Tab label="Split" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Textarea
          color="lightBlue"
          size="regular"
          outline={true}
          placeholder="Question"
          style={{ width: "100%", height: "50vh" }}
          onChange={(e) => {
            setText(e.target.value);
          }}
        onKeyDown={e=>AllowTab(e)}
          value={text}
        />
        <ButtonBar />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box
          sx={{
            width: "100%",
            height: "50vh",
            overflow: "auto",
          }}
        >
          <Markdown className="prose-lg" 
            remarkPlugins={[remarkGfm]}
          >{text}</Markdown>
        </Box>
        <ButtonBar />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <p className="sm:hidden">Use Bigger screen to see in split view</p>
        <div className="hidden sm:block">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Textarea
                color="lightBlue"
                size="regular"
                outline={true}
                placeholder="Question"
                style={{ width: "100%", height: "50vh" }}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                value={text}
              />
            </Grid>
            <Grid item xs={6}>
              <Markdown className="prose" 
                remarkPlugins={[remarkGfm]}
              >{text}</Markdown>
            </Grid>
            <Grid item xs={12}>
              <ButtonBar />
            </Grid>
          </Grid>
        </div>
      </CustomTabPanel>
      < Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
        message={message}
        />
    </Box>
  );
}