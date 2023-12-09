import { CreateNoteService } from '../services/SpaceService';
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Textarea } from "@material-tailwind/react";
import Markdown from "react-markdown";
import { Grid } from "@mui/material";
import { Snackbar } from "@mui/material";
import AllowTab from '../utilities/AllowTabinTextArea';
import remarkGfm from 'remark-gfm'
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

// Main component for creating a personal note

export default function CreatePersonalNote() {
  const [value, setValue] = useState(0);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  // Function to handle tab change

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  // Function to manage buttons for Cancel and Publish

  const ButtonBar = () => {
    const handleCancel = () => {
      window.history.back();
    };
    const handlePublish = () => {
      // Create a personal note using the service

      CreateNoteService({ content: text }).then((data) => {
        if (data.error) {
          // Display error message in the Snackbar

          setMessage(data.error);
          setOpen(true);
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        }
        else {
          // Display success message in the Snackbar and navigate back

          setMessage(data.message);
          setOpen(true);
          window.history.back();
        }
      }
      );
    };


    return (
      <div className="flex justify-end gap-2">

        <button className="bg-red-500 hover:bg-red-700 text-white font-light py-2 px-4 rounded" onClick={handleCancel}>
          Cancel
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-light py-2 px-4 rounded" onClick={handlePublish}>
          Publish
        </button>
      </div>
    );
  };


  // JSX structure for rendering the UI

  return (
    <Box sx={{ width: "100%" }}>
      <h1 className="text-4xl font-regular text-green-700 tracking-wide text-center mt-10 mb-2">Create Personal Note</h1>
      <p className="text-gray-600 text-center font-light text-lg">Write your note here</p>
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
          onKeyDown={e => AllowTab(e)}
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