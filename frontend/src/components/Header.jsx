import React, { useEffect, useState } from 'react';
import './Header.css'; 
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar, sidebarOpen }) => {
  const [Name, setName] = useState('');
  const navigate = useNavigate();

  // Fetch email from localStorage when component mounts
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleSignOut = () => {
    // Clear the token and email from local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');

    // Redirect to login page
    navigate('/login');
  };

  const confirmSignOut = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      handleSignOut();
    }
  };

  return (
    <header className="header">
      <div className="left-section">
        <button className="sidebar_toggle" onClick={toggleSidebar}>
          ☰
        </button>
        {Name && <div className="user-name">Hi {Name}! 🚀</div>}
      </div>
      <h1><img className="headerimg" src="Automation.png" height="31" alt="logo" /> Applify</h1>

      {/* Logout button and user's name below it */}
      <div className="logout-section">
        <button className="logout-btn" onClick={confirmSignOut}>
          <img src="icons8-power-off-button-50.png" alt="logo" />
        </button>
        {/* <div className="user-email">logout</div> */}
      </div>
    </header>
  );
};

export default Header;