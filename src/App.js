import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import RequireAuth from './auth/RequireAuth';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Gagarin from './pages/Gagarin';
import Missions from './pages/Missions';
import MoonOrder from './pages/MoonOrder';
import SpaceFlights from './pages/SpaceFlights';
import FlightAdd from './pages/FlightAdd';
import Search from './pages/Search';
import MissionAdd from './pages/MissionAdd';
import MissionEdit from './pages/MissionEdit';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/gagarin"
            element={
              <RequireAuth>
                <Gagarin />
              </RequireAuth>
            }
          />
          <Route
            path="/missions"
            element={
              <RequireAuth>
                <Missions />
              </RequireAuth>
            }
          />
          <Route
            path="/moon-order"
            element={
              <RequireAuth>
                <MoonOrder />
              </RequireAuth>
            }
          />

          <Route
            path="/search"
            element={
              <RequireAuth>
                <Search />
              </RequireAuth>
            }
          />

          <Route
            path="/flights"
            element={
              <RequireAuth>
                <SpaceFlights />
              </RequireAuth>
            }
          />
          <Route
            path="/add-flight"
            element={
              <RequireAuth>
                <FlightAdd />
              </RequireAuth>
            }
          />
          <Route
            path="/add-mission"
            element={
              <RequireAuth>
                <MissionAdd />
              </RequireAuth>
            }
          />
          <Route
            path="/edit-mission/:id"
            element={
              <RequireAuth>
                <MissionEdit />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
