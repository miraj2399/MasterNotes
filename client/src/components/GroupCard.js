import {Card, CardBody, CardHeader,Typography } from "@material-tailwind/react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box } from "@mui/material";

export default function GroupCard(props) {
    const group = props.group
    return (

        <Card className="w-80 h-64 m-4 bg-green-100 hover:bg-green-300" onClick={
            () => {
                window.location.href = `/group/${group._id}`
            }
        }>
            <CardHeader className="p-3 bg-green-200" floated={false}>
                <Typography  variant="h6">
                    {group.name}
                </Typography>
            </CardHeader>
            <CardBody className="h-[60%] overflow-auto">
                <Typography color="black" variant="subtitle1">
                    {group.courseTitle}
                </Typography>
                <Box className="flex justify-between items-center">
                    <Typography variant="subtitle2">
                        <PeopleIcon fontSize="small"/>
                        {group.members.length} Members
                    </Typography>
                    <Typography variant="subtitle2">
                        <AccessTimeIcon fontSize="small"/> {group.startTime} - {group.endTime}
                    </Typography>
                </Box>
                <Box className="flex justify-between items-center">
                    <Typography variant="subtitle2">
                        <CheckCircleOutlineIcon fontSize="small"/>
                        {group.weekdays.map((day) => {
                            return day + " "
                        })}
                    </Typography>
                    <Typography variant="subtitle2">
                        <LocationOnIcon fontSize="small"/>
                        {group.location}
                    </Typography>
                </Box>

                <Box className="flex justify-between items-center">
                    <Typography variant="subtitle2">
                        <CalendarMonthIcon fontSize="small"/> {new Date(group.startDate).toDateString()} - {new Date(group.endDate).toDateString()}
                    </Typography>
                </Box>

            </CardBody>
        </Card>
   
    )
}
