import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea
} from "@material-tailwind/react";
import SelectedDatesForGroup from "../components/SelectedDatesForGroup";
import { useState } from "react";
import getDatesInRange from "../utilities/GetDatesInRange";
import { CreateGroupService } from "../services/GroupServices";
import { Snackbar } from "@mui/material";
import LeftPopUp from '../components/LeftPopUp';


export default function CreateGroup() {
 const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

 const emptyGroup = {
    name: "",
    courseNumber: "",
    courseTitle: "",
    instructor: "",
    location: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    weekdays: [],
    description: "",
    inviteOnly: true,
  };
  function handleChange(e) {
    setGroup({ ...group, [e.target.name]: e.target.value });
    if (dates.length > 0 && e.targetName!="startDate" && e.target.name!="endDate") return;
    if (group.startDate && group.endDate && group.weekdays) {
      setDates(
        getDatesInRange(
          new Date(group.startDate),
          new Date(group.endDate),
          group.weekdays
        )
      );
    }
  }
  function handleCheckbox(e) {
    if (e.target.checked) {
      setGroup({ ...group, weekdays: [...group.weekdays, e.target.name] });
    } else {
      setGroup({
        ...group,
        weekdays: group.weekdays.filter((day) => day !== e.target.name),
      });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    const newGroup = {
      ...group,
      startDate: new Date(group.startDate),
      endDate: new Date(group.endDate),
      dates: dates,
    };
    CreateGroupService(newGroup)
      .then((res) => {
        setOpen(true);
        setMessage("Group Created");
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 1000);
      })
      .catch((err) => {
        setOpen(true);
        setMessage("Group Creation Failed, message: " + err.message);
      });

    
  }
  const [group, setGroup] = useState(emptyGroup);
  const [dates, setDates] = useState([]);

  return (

    <div className="grid md:grid-cols-2 p-2">
    <div>
          </div>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Create Group
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter the name of the group and the dates class meets on.
        </Typography>
        <form className="mt-8 mb-2 max-w-screen-lg">
          <div className="mb-4 flex flex-col gap-6">
            <div>
              <Input size="lg" label="Name" name="name" onChange={handleChange} />
              <Typography className="ml-3 text-gray-500 text-sm">
                eg. CS 431 FALL 2023
              </Typography>
            </div>
            <div>
              <Input size="lg" label="Course Number" name="courseNumber" onChange={handleChange}/>
              <Typography  className="ml-3 text-gray-500 text-sm">
                eg. 01:198:431
              </Typography>
            </div>
            <div>
              <Input size="lg" label="Course Title" name="courseTitle" onChange={handleChange}/>
              <Typography  className="ml-3 text-gray-500 text-sm">
                eg. Software Engineering
              </Typography>
            </div>
            <div>
              <Input size="lg" label="Instructor" name="instructor" onChange={handleChange} />
              <Typography className="ml-3 text-gray-500 text-sm">
                eg. Lily Chang
              </Typography>
            </div>
            <div>
              <Input size="lg" label="Location" name="location" onChange={handleChange}/>
              <Typography className="ml-3 text-gray-500 text-sm">
                eg. Hill 114
              </Typography>
            </div>
            <div>
                <div className="grid grid-cols-2 gap-4">
              <Input size="lg" label="Start time" type="time" name="startTime" onChange={handleChange} />
              <Input size="lg" label="End time" type="time" name="endTime" onChange={handleChange}/>
              </div>

              <Typography className="ml-3 text-gray-500 text-sm">
                eg. 1:40pm - 3:00pm
              </Typography>
            </div>
            <div>
                <div className="grid grid-cols-2 gap-4">
              <Input size="lg" label="Start Date" type="date" name="startDate" onChange={handleChange}/>
              <Input size="lg" label="End Date" type="Date" name="endDate" onChange={handleChange}/>
              </div>

              <Typography className="ml-3 text-gray-500 text-sm">
                eg. 09/05/2023 - 12/22/2023
              </Typography>
            </div>

            <div>
                <Typography className="ml-3 text-gray-900 text-sm">
                Days of the week
                </Typography>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-2  ">
                <Checkbox  label="Mon" name="Mon" onClick={handleCheckbox}/>
                <Checkbox   label="Tue" name="Tue" onClick={handleCheckbox}/>
                <Checkbox   label="Wed" name="Wed" onClick={handleCheckbox}/>
                <Checkbox   label="Thu" name="Thu" onClick={handleCheckbox}/>
                <Checkbox   label="Fri" name="Fri" onClick={handleCheckbox}/>
                <Checkbox   label="Sat" name="Sat" onClick={handleCheckbox}/>
                <Checkbox   label="Sun" name="Sun" onClick={handleCheckbox}/>
                </div>

                <Typography className="ml-3 text-gray-500 text-sm">
                eg. Tuesday & Thursday
                </Typography>
            </div>

            <div>
                <Textarea size="lg" label="Description" name="description" onChange={handleChange}/>
                <Typography className="ml-3 text-gray-500 text-sm">
                eg. This course is an introduction to the principles and practice of software engineering and the software development process. Topics include software life cycle models, requirements analysis, software design, implementation, testing, maintenance, and project management. Students will work in teams to develop a software project.
                </Typography>
            </div>

            <div>
                <div>
                <Checkbox  label="Invite only" name="inviteOnly"/>
                <Checkbox  label="Public"/>
                </div>
                <Typography className="ml-3 text-gray-500 text-sm">
                Invite only: Only people who have been invited to the group can join.<br/>
                Public: Anyone with the link can join.
                </Typography>
            </div>

            <div>
                <Button   type="submit" className="w-full" onClick={handleSubmit}>
                Create Group
                </Button>
            </div>

        

            
          </div>
        </form>
        
      </Card>
      <div>
        <SelectedDatesForGroup dates={dates} setDates={setDates} startDate={new Date(group.startDate)} endDate={new Date(group.endDate)}/>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={message}
        />
    </div>
  );
}
