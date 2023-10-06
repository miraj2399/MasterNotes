import {Button} from '@material-tailwind/react'
import GroupSection from '../components/GroupSection'
import PersonalSpaceSection from '../components/PersonalSpaceSection'
import NotificationCenter from '../components/NotificationCenter';
import LeftPopUp from '../components/LeftPopUp';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
import Cookies from 'js-cookie';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import { styled, useTheme } from '@mui/material/styles';


export default function Dashboard (){
 return (
        <div>
            <LeftPopUp/>
        </div>

    )
}