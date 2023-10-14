

import { CreateNoteService } from '../services/SpaceService';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Modal from "react-modal";

export default function CreatePersonalNote() {
    const [note, setNote] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
      setIsOpen(true);
  }
  
  function closeModal() {
      setIsOpen(false);
  }
  
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '80vw',
      height: '80vw',
      marginRight: '-50%',
      maxHeight: '500px',
      transform: 'translate(-50%, -50%)',
    },
  };
    return (
        <div className="grid md:grid-cols-2 gap-2">
            <div className="md:col-span-2">
            <div className="flex p-3 flex-wrap">
            <div className='flex-1'>
            <Typography variant="h5" className="text-center">Create Note</Typography>
            <Typography variant="subtitle1" className="text-center">Write your note in markdown</Typography>
            </div>
            <div className='flex justify-center items-center gap-2 mt-4 flex-1'>
                <button className="bg-green-400 text-white p-2 rounded-3xl flex justify-center items-center gap-2">
                    <SaveIcon onClick={(e)=>{
                        e.preventDefault()
                        CreateNoteService({
                            content:note
                        })
                        window.location.href = "/dashboard"
                    }}
                        />
                </button>
                <button className="bg-red-400 text-white p-2 rounded-3xl flex justify-center items-center gap-2">
                    <CancelIcon/>
                </button>
                <div>
                <button className="bg-red-400 text-white p-2 rounded-3xl flex justify-center items-center gap-2" onClick={openModal}>
                    <QuestionMarkIcon/>
                </button>   
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Information"
                    style={customStyles}
                >
                <div className="font-bold text-center">Markdown Instructions</div><br />
                <div className="text-center">
                <b># Heading 1</b> <br />
                <b>## Heading 2</b> <br />
                <b>### Heading 3</b> <br />
                <b>Bold </b>	**bold text**<br />
                <b>Italic	</b>*italicized text*<br />
                <b> Autolink literals</b>
                <br />
                www.example.com, https://example.com, and contact@example.com.
                <br />
                <b>Footnote</b>
                <br />
                A note[^1]
                <br />
                [^1]: Big note.
                <br />
                <b>Strikethrough</b>
                <br />
                ~one~ or ~~two~~ tildes.
                <br />
                <b>Table</b> 
                <br />
                | a | b  |  c |  d  |
                | - | :- | -: | :-: |
                <br />
                <b>Tasklist</b>
                <br />
                * [ ] to do
                <br />
                * [x] done
                </div>
                </Modal>
            </div>

            </div>
            </div>
            </div>
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Textarea } from "@material-tailwind/react";
import Markdown from "react-markdown";
import { Grid } from "@mui/material";
import { Snackbar } from "@mui/material";
import AllowTab from '../utilities/AllowTabinTextArea';
import remarkGfm from 'remark-gfm'
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

export default function CreatePersonalNote() {
  const [value,setValue] = useState(0);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 



  const ButtonBar = () => {
    const handleCancel = () => {
        window.history.back();
      };
    const handlePublish = () => {
        CreateNoteService({content:text}).then((data) => {
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
        <h1 className="text-4xl font-extrabold text-green-700 tracking-wide text-center">Create Personal Note</h1>
        <p className="text-gray-500 text-center">Write your note here</p>
        <br />
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
          placeholder="Regular"
          style={{ width: "100%", height: "60vh" }}
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
            height: "60vh",
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
                placeholder="Regular"
                style={{ width: "100%", height: "60vh" }}
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
