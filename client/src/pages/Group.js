import { Timeline, Button, TimelineItem, TimelineBody, TimelineHeader, TimelineConnector, TimelineIcon} from "@material-tailwind/react";
import {  Typography } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useParams } from "react-router-dom";
import { GetGroupByIdService, LeaveGroupService } from "../services/GroupServices";
import { useEffect, useState } from "react";
import InviteJoinGroup from "../components/InviteJoinGroup";
import  LectureNotePreview  from "../components/LectureNotePreview";
import { Link } from "react-router-dom";

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
            <div className="flex h-72 justify-center items-center gap-2 mb-10 bg-cyan-500 bg-opacity-50">
            <div class="text-center">
           <h1 color="blue-gray" className="hover:text-gray-600 text-gray-800 text-4xl text-center font-extralight mb-5">{group.name}</h1>
           <h1 color="blue-gray" className="hover:text-gray-600 text-gray-800 text-xl text-center font-extralight mb-5">{group.courseTitle}</h1>
           <InviteJoinGroup group={group}/>
           </div>
           </div>
              <div className="flex justify-center items-center gap-2 mb-10">
              <Button className="text-white font-light text-sm bg-green-500 hover:bg-green-600" buttonType="filled" size="regular" rounded={false} block={false} iconOnly={false} ripple="light" onClick={() => {
                window.location.href = `/createGroupNote/${group._id}`
            }}> Create Note </Button>
            </div>


        <Timeline className="m-3">
         { dates &&
            dates.map((date) => (
                <div key={date.date} className="mb-24">
                <TimelineItem>
                    <TimelineHeader>
                        <div className="flex justify-center items-center gap-2 p-3 bg-cyan-500 bg-opacity-50 rounded-xl">
                        <TimelineIcon color="black" />
                        <CalendarTodayIcon/>
                        <p className="text-black text-lg font-extralight">{new Date(date.date).toDateString()}</p>
                       
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
                        {!notes && <div>No notes yet</div>}
                        </div>
                    </TimelineBody>
                    <TimelineConnector/>
                </TimelineItem>
                </div>
            ))
          }
        </Timeline>
        <div class="text-center m-5">
            <Button 
            className="text-white font-light text-sm bg-red-500 hover:bg-red-600 mr-3"
            onClick={() => {
            LeaveGroupService(group._id) 
            window.location.href = "/dashboard"
            }}
            >Leave Group</Button>

              <Link to="/dashboard"><Button className="text-white font-light text-sm ml-3" color="black">
                Back
            </Button></Link>
        </div>
        </div>
    )
}

