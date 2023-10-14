// page imports
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import CreateGroup from "./pages/CreateGroup";
import CreatePersonalNote from "./pages/CreatePersonalNote";
import CreateGroupNote from "./pages/CreateGroupNote";
import LectureNote from "./pages/LectureNote";
import Groups from "./pages/Groups";
import PersonalSpaceSection from "./components/PersonalSpaceSection";
import FAQSection from "./components/FAQSection";
import PersonalNote from "./pages/PersonalNote";

// icons
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import GridViewIcon from '@mui/icons-material/GridView';

import { useState } from "react";
import { styled } from '@mui/material/styles';
import { Box, Button } from "@mui/material";


import ProtectedRoute from "./utilities/ProtectedRoute";
import PublicRoute from "./utilities/PublicRoute";
import { Routes, Route } from 'react-router-dom';


import './index.css';
import Group from "./pages/Group";
import { Drawer } from "@mui/material";

const drawerWidth=200;
const Main = styled(Box,{ shouldForwardProp: (prop) => prop !== 'drawerOpen' })(({ theme, drawerOpen }) => ({
  marginLeft: drawerOpen? `${drawerWidth}px` : '0px',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));


function App() {
  const drawerStatusFromLocalStorage = localStorage.getItem('drawerOpen');
  const [drawerOpen, setDrawerOpen] = useState(drawerStatusFromLocalStorage? drawerStatusFromLocalStorage==='true':false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
    localStorage.setItem('drawerOpen',!drawerOpen);
  }



  return (

    <>
    <Drawer variant="persistent" open={drawerOpen} sx={{width:drawerWidth, flexShrink:0, '& .MuiDrawer-paper':{width:drawerWidth, boxSizing:'border-box'}}}>
      <div style={{'text-align': 'left', 'margin-top': '20px'}}>
           <h2 style={{'text-align': 'center', 'color': '#4169e1', 'fontWeight': "bold", 'fontSize': '40px'}}> RU NOTES </h2>
          {/* Here goes all the tabs (eg. Dashboard, Group, Space, Settings) */}
          <div style={{'margin-top': '20px', 'padding': '25px'}}>
            < Button onClick={()=>{window.location.href='/dashboard'}}><GridViewIcon/>     Dashboard</Button>
          </div>
          <div style={{'margin-top': '15px', 'padding': '20xpx', 'padding-left': '25px'}}>
            < Button onClick={()=>{window.location.href='/groups'}}><GroupIcon/>     Groups</Button>
          </div>
          <div style={{'margin-top': '15px', 'padding': '20px','padding-left': '22px'}}>
            < Button onClick={()=>{window.location.href='/spaces'}}><PersonOutlineIcon/>     Spaces</Button>
          </div>
          <div style={{'margin-top': '15px', 'padding': '20px','padding-left': '25px'}}>
            < Button onClick={()=>{window.location.href='/settings'}}><SettingsIcon/>     Settings</Button>
          </div>
          <div style={{'margin-top': '15px', 'padding': '20px','padding-left': '28px'}}>
            < Button onClick={()=>{window.location.href='/FAQ'}}><LiveHelpIcon/>     FAQ</Button>
          </div>
          <div style={{'text-align': 'center', 'margin-top': '25px', 'padding': '15px'}}><Button onClick={handleDrawerToggle}><ArrowBackIosIcon/></Button> </div>

      </div>
    </Drawer>

      <Main drawerOpen={drawerOpen}>
      { !drawerOpen && <Button onClick={handleDrawerToggle}><MenuIcon/></Button>}
      <Routes>
        <Route element={<PublicRoute/>}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login  />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoute/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/group/:id" element={<Group />} />
          <Route path="/spaces" element={<PersonalSpaceSection />} />
          <Route path="/createGroup" element={<CreateGroup />} />
          <Route path="/createPersonalNote" element={<CreatePersonalNote />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/FAQ" element={<FAQSection />} />
          <Route path='/createGroupNote/:group' element={<CreateGroupNote />} />
          <Route path="/lectureNote/:id" element={<LectureNote />} />
          <Route path="/personalNote/:id" element={<PersonalNote />} />

        </Route>
      </Routes>
      </Main>
    </>
  );
}

export default App;
