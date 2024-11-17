import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import AutoApplyPage from './pages/AutoApplyPage/AutoApplyPage.jsx';
import ManageJobsPage from './pages/ManageJobsPage/ManageJobsPage.jsx';
import StatsPage from './pages/stats/stats.jsx';
import LinkedInFormPage from './pages/LinkedInform/LinkedInform.jsx';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import './App.css';
import InternshalaformPage from './pages/Internshalaform/internshalaform.jsx';
import PrivateRoute from './components/privateRoutes.jsx';  // Import the PrivateRoute
import ProfilePage from './pages/profile/ProfilePage.jsx';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <Routes>
        {/* Other routes without sidebar and header */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route
          path="/linkedin-form"
          element={
            <PrivateRoute>
              <LinkedInFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/internshala-form"
          element={
            <PrivateRoute>
              <InternshalaformPage />
            </PrivateRoute>
          }
        />

        {/* Route for Auto Apply page with Sidebar and Header */}
        <Route
          path="/autoapply"
          element={
            <PrivateRoute>
              <div className={`app-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <Header toggleSidebar={toggleSidebar} />
                <div className="main-content">
                  <AutoApplyPage />
                </div>
              </div>
            </PrivateRoute>
          }
        />

        {/* Route for Manage Jobs page with Sidebar and Header */}
        <Route
          path="/managejobs"
          element={
            <PrivateRoute>
              <div className={`app-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <Header toggleSidebar={toggleSidebar} />
                <div className="main-content">
                  <ManageJobsPage />
                </div>
              </div>
            </PrivateRoute>
          }
        />
              <Route
          path="/statistics"
          element={
            <PrivateRoute>
              <div className={`app-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <Header toggleSidebar={toggleSidebar} />
                <div className="main-content">
                  <StatsPage />
                </div>
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <div className={`app-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <Header toggleSidebar={toggleSidebar} />
                <div className="main-content">
                  <ProfilePage />
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;






