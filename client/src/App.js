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




import ProtectedRoute from "./utilities/ProtectedRoute";
import PublicRoute from "./utilities/PublicRoute";
import { Routes, Route } from 'react-router-dom';


import './index.css';
import Group from "./pages/Group";
import { Drawer } from "@mui/material";




function App() {
 



  return (

    <>
   

      
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
    </>
  );
}

export default App;
