// page imports
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import CreateGroup from "./pages/CreateGroup";
import CreatePersonalNote from "./pages/CreatePersonalNote";


import ProtectedRoute from "./utilities/ProtectedRoute";
import PublicRoute from "./utilities/PublicRoute";
import { Routes, Route } from 'react-router-dom';


import './index.css';

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
          <Route path="/createGroup" element={<CreateGroup />} />
          <Route path="/createPersonalNote" element={<CreatePersonalNote />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
