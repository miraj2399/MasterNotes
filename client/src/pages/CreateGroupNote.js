// Importing necessary components and dependencies

import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Textarea } from "@material-tailwind/react";
import Markdown from "react-markdown";
import { Grid } from "@mui/material";
import { Autocomplete, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { GetGroupByIdService, CreateGroupLectureNoteService } from "../services/GroupServices";
import { Snackbar } from "@mui/material";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Fab from '@mui/material/Fab';
import Modal from "react-modal";
import remarkGfm from "remark-gfm";
// Function to render a custom tab panel

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
// Function to manage accessibility props for tabs

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
// Main component for creating a group note

export default function CreateGroupNote() {
  // State variables initialization using useState hooks

  const [value, setValue] = useState(0);
  const [text, setText] = useState("");
  const [group, setGroup] = useState({});
  const [dates, setDates] = useState([]);
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { group: groupId } = useParams();
  // Fetch group information by ID on component mount

  useEffect(() => {
    GetGroupByIdService(groupId).then((data) => {
      setGroup(data);
      setDates(
        data.dates.map((date) => {
          return new Date(date.date).toDateString();
        })
      );
    });
  }, [groupId]);
  // Function to handle tab change

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Functions to handle opening and closing of the modal

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  // Styles for the modal

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
  // Function to manage buttons for Cancel and Publish

  const ButtonBar = () => {
    // Handlers for Cancel and Publish buttons

    const handleCancel = () => {
      window.history.back();
    };

    const handlePublish = () => {
      // Validation before publishing the note

      if (text.length < 20) {
        setMessage("Note must be at least 20 characters long");
        setOpen(true);
        return;
      }
      if (date === "") {
        setMessage("Date is required");
        setOpen(true);
        return;
      }
      // Fetch lecture date and create the group lecture note

      const lectureDate = group.dates.find((d) => {
        return new Date(d.date).toDateString() === date;
      });
      CreateGroupLectureNoteService(group._id, lectureDate._id, text).then((data) => {
        window.location.href = `/group/${group._id}`;
      });
    };
    return (
      <>
        <div className="flex justify-end gap-2">
          <Autocomplete
            id="tags-outlined"
            options={dates}
            value={date}
            defaultValue={[dates[0]]}
            freeSolo
            style={{ minWidth: 200 }}
            renderInput={(params) => (
              <TextField {...params} variant="filled" placeholder="Date" />
            )}
            onChange={(e, value) => {
              setDate(value);
              console.log(value);
            }}
          />
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleCancel}>
            Cancel
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handlePublish}>
            Publish
          </button>

        </div>
        <div>
          <Fab aria-label="question" onClick={openModal}>
            <QuestionMarkIcon />
          </Fab>
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
      </>
    );
  };
  // Function to display group information

  function GroupInfo(group) {
    return (
      <div className="flex justify-center items-center gap-2 mb-10">
        <Typography variant="h5">{group.name}</Typography>
        <Typography variant="subtitle1">{group.courseTitle}</Typography>
      </div>
    );
  }
  // JSX structure for rendering the UI

  return (
    <Box sx={{ width: "100%" }}>
      {group && GroupInfo(group)}
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
          <Markdown className="prose-lg" remarkPlugins={[remarkGfm]}>{text}</Markdown>
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
              <Markdown className="prose" remarkPlugins={[remarkGfm]}>{text}</Markdown>
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