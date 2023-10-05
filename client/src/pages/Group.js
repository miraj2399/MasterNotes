import { Timeline, TimelineItem, TimelineBody, TimelineHeader, TimelineConnector, TimelineIcon} from "@material-tailwind/react";
import {  Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { GetGroupByIdService, LeaveGroupService } from "../services/GroupServices";
import { useEffect, useState } from "react";
import InviteJoinGroup from "../components/InviteJoinGroup";

export default function Group(){
    const {id} = useParams();
    const [group, setGroup] = useState({});
    const [dates, setDates] = useState([]);
    useEffect(() => {
        GetGroupByIdService(id).then((data) => {
            setGroup(data);
            setDates(data.dates);
        })
    }, [])


    return (
        <div className="grid">
           <div className="flex justify-center items-center gap-2 mb-10">
            <Typography variant="h5">{group.name}</Typography>
            <Typography variant="subtitle1">{group.courseTitle}</Typography>

           </div>
        <Timeline>
         { dates &&
            dates.map((date) => (
                <div key={date.date}>
                <TimelineItem>
                    <TimelineHeader>
                        <TimelineIcon color="green" icon="info"/>
                        <Typography variant="h6">{new Date(date.date).toDateString()}</Typography>
                    </TimelineHeader>
                    <TimelineBody className="p-10">
                        <Typography variant="subtitle1">Nothing to see here</Typography>
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

