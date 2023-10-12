import {Button} from '@material-tailwind/react'
import GroupSection from '../components/GroupSection'
import PersonalSpaceSection from '../components/PersonalSpaceSection'
import NotificationCenter from '../components/NotificationCenter';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
import Cookies from 'js-cookie';
export default function Dashboard (){
    const handleLogout = () => {
        Cookies.remove('token')
        window.location.href = "/login"
    }
    return (
        <>
        <div className='grid gap-20 bg-white'>
        <GroupSection/>
        <PersonalSpaceSection/>
        <NotificationCenter/>
        <div className='flex  justify-center items-center gap-2' >
            <IconButton onClick={() => window.location.href = "/settings"}>
            <SettingsIcon/> 
            </IconButton>
            <Button color='red' onClick={handleLogout}>Logout</Button>
        </div>
        </div>
        </>
    )
}