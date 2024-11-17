import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [Name, setName] = useState('');
  const navigate = useNavigate();

  // Fetch userName from localStorage when the component mounts
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleSignOut = () => {
    // Clear the token and user details from local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');

    // Redirect to login page
    navigate('/login');
  };

  const confirmSignOut = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      handleSignOut();
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <h2><img className="sidebarimg" src="Automation.png" height="31" alt="logo" /> Applify</h2>
      <nav>
        <ul>
          <li><Link to="/autoapply" onClick={toggleSidebar}><img className='li' src="automation (1).png" height="31" alt="Auto Apply" />  Auto Apply</Link></li>
          <li><Link to="/managejobs" onClick={toggleSidebar}><img className='li' src="proposal.png" height="31" alt="Manage Jobs" />  Manage Jobs</Link></li>
          <li><Link to="/statistics" onClick={toggleSidebar}><img className='li' src="bar-chart.png" height="31" alt="Statistics" />  Statistics</Link></li>
          <li><Link to="/profile" onClick={toggleSidebar}><img className='li' src="user.png" height="31" alt="Help" />  Profile </Link></li>
        </ul>
      </nav>
      <div className="logout-section">
        <button className="logout-btn1" onClick={confirmSignOut}>
          <img src="icons8-power-off-button-50.png" alt="Logout" />Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
