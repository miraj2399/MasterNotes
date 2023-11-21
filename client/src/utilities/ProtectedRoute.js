import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";
// icons
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import GridViewIcon from '@mui/icons-material/GridView';
import LogoutIcon from '@mui/icons-material/Logout';



import { useState } from "react";
import { styled } from '@mui/material/styles';
import { Box, Button, Drawer} from "@mui/material";
import Person from "@mui/icons-material/Person";


const drawerWidth=200;
const Main = styled(Box,{ shouldForwardProp: (prop) => prop !== 'drawerOpen' })(({ theme, drawerOpen }) => ({
  marginLeft: drawerOpen? `${drawerWidth}px` : '0px',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

export default function ProtectedRoute() {
  const drawerStatusFromLocalStorage = localStorage.getItem('drawerOpen');
  const [drawerOpen, setDrawerOpen] = useState(drawerStatusFromLocalStorage? drawerStatusFromLocalStorage==='true':false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
    localStorage.setItem('drawerOpen',!drawerOpen);
  }

  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/login"  exact/>;
  }
  return (
    <>
    <Drawer variant="persistent" open={drawerOpen} sx={{width:drawerWidth, flexShrink:0, '& .MuiDrawer-paper':{width:drawerWidth, boxSizing:'border-box'}}}>

    <div style={{'text-align': 'left', marginTop:"10px"}}>
          <div className="flex justify-center mb-10">
        <div style={{'text-align': 'center'}}><Button onClick={handleDrawerToggle}><ArrowBackIosIcon/></Button> </div>
         <h2 style={{'text-align': 'center', 'color': '#4169e1', 'fontWeight': "bold", 'fontSize': '20px'}}> RU NOTES </h2>
         
         </div>
        {/* Here goes all the tabs (eg. Dashboard, Group, Space, Settings) */}
        
        <div style={{'margin-top': '20px', 'padding': '20px'}}>
          < Button onClick={()=>{window.location.href='/dashboard'}}><GridViewIcon/>     Dashboard</Button>
        </div>
        <div style={{'margin-top': '20px', 'padding': '20px'}}>
          < Button onClick={()=>{window.location.href='/groups'}}><GroupIcon/>     Groups</Button>
        </div>
        <div style={{'margin-top': '20px', 'padding': '20px'}}>
          < Button onClick={()=>{window.location.href='/spaces'}}><PersonOutlineIcon/>     Spaces</Button>
        </div>
        <div style={{'margin-top': '20px', 'padding': '20px'}}>
          < Button onClick={()=>{window.location.href='/notifications'}}><NotificationsNoneIcon/>     Notifications</Button>
        </div>

    </div>
    <div style={{'position': 'absolute', 'bottom': '0', 'width': '100%'}}>
    <div className="flex flex-row gap-2  ml-10">
          <p className="text-blue-700">{localStorage.getItem("firstName")} {localStorage.getItem("lastName")}</p>
        </div>
      <div style={{'margin-top': '15px', 'padding': '20px','padding-left': '25px'}}>
        < Button color="error" onClick={()=>{Cookies.remove('token'); window.location.href='/login'}}>
          <LogoutIcon/>     Logout
        </Button>
      </div>
      </div>
  </Drawer>
  <Main drawerOpen={drawerOpen}>
    <div className="absolute top-0 left-0">
      { !drawerOpen && <Button onClick={handleDrawerToggle}><MenuIcon/></Button>}
    </div>
  <Outlet/>
  </Main>
  </>
  )
}
