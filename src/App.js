import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
// import Gagarin from './pages/Gagarin';
// import MoonOrder from './pages/MoonOrder';
// import Missions from './pages/Missions';
// import FlightList from './pages/FlightList';
// import Search from './pages/Search';
// import Layout from './components/Layout';
// import RequireAuth from "./auth/RequireAuth";
// import MissionAdd from "./pages/MissionAdd";
// import MissionEdit from "./pages/MissionEdit";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/> 
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/gagarin" element={<RequireAuth><Gagarin /></RequireAuth>} /> */}
        {/* <Route path="/moon-order" element={<RequireAuth><MoonOrder /></RequireAuth>} />
        <Route path="/missions" element={<RequireAuth><Missions /></RequireAuth>} />
        <Route path="/flights" element={<RequireAuth><FlightList /></RequireAuth>} />
        <Route path="/search" element={<RequireAuth><Search /></RequireAuth>} />
        <Route path="/add-mission" element={<RequireAuth><MissionAdd /></RequireAuth>} />
        <Route path="/edit-mission/:missionId" element={<RequireAuth><MissionEdit /></RequireAuth>} /> */}
      </Routes>
    </Router>
  );
};

export default App;