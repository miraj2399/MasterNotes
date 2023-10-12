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
import { GetGroupByIdService, CreateGroupLectureNoteService} from "../services/GroupServices";
import { Snackbar } from "@mui/material";
import remarkGfm from "remark-gfm";
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

export default function CreateGroupNote() {
  const [value, setValue] = useState(0);
  const [text, setText] = useState("");
  const [group, setGroup] = useState({});
  const [dates, setDates] = useState([]);
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { group: groupId } = useParams();
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const ButtonBar = () => {
    const handleCancel = () => {
        window.history.back();
      };
    
        const handlePublish = () => {
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
            const lectureDate = group.dates.find((d) => {
                return new Date(d.date).toDateString() === date;
            });
            CreateGroupLectureNoteService(group._id, lectureDate._id, text).then((data) => {
                window.location.href = `/group/${group._id}`;
            });
        };
    return (
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
    );
  };

  function GroupInfo(group) {
    return (
      <div className="flex justify-center items-center gap-2 mb-10">
        <Typography variant="h5">{group.name}</Typography>
        <Typography variant="subtitle1">{group.courseTitle}</Typography>
      </div>
    );
  }

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
