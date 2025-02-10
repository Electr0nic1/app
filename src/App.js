import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import RequireAuth from './auth/RequireAuth';

import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Gagarin from './pages/Gagarin';
import Missions from './pages/Missions';
import MissionAdd from './pages/MissionAdd';
import MissionEdit from './pages/MissionEdit';
import SpaceFlights from './pages/SpaceFlights';
import FlightAdd from './pages/FlightAdd';
import MoonOrder from './pages/MoonOrder';
import Search from './pages/Search';

const App = () => {
  const { user, loading } = useAuth;

  if (loading) {
    // Отображаем что-то, пока идет загрузка
    return <div>Загрузка приложения...</div>;
  }

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
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
