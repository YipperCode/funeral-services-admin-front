import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import LocationsPage from './pages/LocationsPage';
import UsersPage from './pages/UsersPage';
import PlansPage from './pages/PlansPage';
import SalesPage from './pages/SalesPage';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/sales" element={<SalesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
