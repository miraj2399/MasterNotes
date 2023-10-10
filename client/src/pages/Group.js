import { Timeline, Button, TimelineItem, TimelineBody, TimelineHeader, TimelineConnector, TimelineIcon} from "@material-tailwind/react";
import {  Typography } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useParams } from "react-router-dom";
import { GetGroupByIdService, LeaveGroupService } from "../services/GroupServices";
import { useEffect, useState } from "react";
import InviteJoinGroup from "../components/InviteJoinGroup";

export default function Group(){
    const {id} = useParams();
    const [group, setGroup] = useState({});
    const [dates, setDates] = useState([]);
    const [notes, setNotes] = useState([{}]);
    useEffect(() => {
        GetGroupByIdService(id).then((data) => {
            setGroup(data);
            setDates(data.dates);
            setNotes(data.notes);
        })
    }, [])


    return (

        <div className="grid">
         <div>
                    </div>
           <div className="flex justify-center items-center gap-2 mb-10">
            <Typography variant="h5">{group.name}</Typography>
            <Typography variant="subtitle1">{group.courseTitle}</Typography>
           </div>
              <div className="flex justify-center items-center gap-2 mb-16">
              <Button color="green" buttonType="filled" size="regular" rounded={false} block={false} iconOnly={false} ripple="light" onClick={() => {
                window.location.href = `/createGroupNote/${group._id}`
            }}>
                Create Note
            </Button>
            </div>

        <Timeline className="m-3">
         { dates &&
            dates.map((date) => (
                <div key={date.date} className="mb-24">
                <TimelineItem>
                    <TimelineHeader>
                        <div className="flex justify-center items-center gap-2 p-3 bg-blue-300 rounded-xl ">
                        <TimelineIcon color="blue" />
                        <CalendarTodayIcon/>
                        <p className="text-lg font-semibold">{new Date(date.date).toDateString()}</p>
                       
                        </div>
                    </TimelineHeader>
                    <TimelineBody>
                        <div className="grid sm:grid-cols-3 gap-2">
                        {notes &&
                        notes.map((note) => {
                            if (note.date === date._id) {
                                return <LectureNotePreview key={note._id} 
                                content = { note.content.split("\n").slice(1).join("\n")}
                                title = {note.content.split("\n")[0]}
                                id = {note._id}
                                />
                            }
                        })}
                        </div>
                    </TimelineBody>
                    <TimelineConnector/>
                </TimelineItem>
                </div>
            ))
          }
        </Timeline>
        <InviteJoinGroup group={group}/>
        <button 
        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-sm font-semibold w-32"
        onClick={() => {
        LeaveGroupService(group._id) 
        window.location.href = "/dashboard"
        }}
        >Leave Group</button>
        </div>
    )
}

