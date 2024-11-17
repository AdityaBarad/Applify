// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Sidebar.css';
// import { useNavigate } from 'react-router-dom';

// const Sidebar = ({ isOpen }) => {
//   const [Name, setName] = useState('');
//   const navigate = useNavigate();

//   // Fetch email from localStorage when component mounts
//   useEffect(() => {
//     const storedName = localStorage.getItem('userName');
//     if (storedName) {
//       setName(storedName);
//     }
//   }, []);

//   const handleSignOut = () => {
//     // Clear the token and email from local storage
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userEmail');
//     localStorage.removeItem('userName');

//     // Redirect to login page
//     navigate('/login');
//   };

//   const confirmSignOut = () => {
//     const confirmLogout = window.confirm("Are you sure you want to log out?");
//     if (confirmLogout) {
//       handleSignOut();
//     }
//   };

//   return (
//     <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
//       <h2><img src="auto-apply.svg" height="31" alt="logo" /> Applify</h2>
//       <nav>
//         <ul>
//           <li><Link to="/autoapply"><img src="automatic.svg" height="31" alt="logo" />  Auto Apply</Link></li>
//           <li><Link to="/autoapply"><img src="webpack-original.svg" height="31" alt="logo" />  Manage jobs</Link></li>
//           <li><Link to="/autoapply"><img src="cloud-jobs-api.svg" height="31" alt="logo" />  Statistics</Link></li>
//           <li><Link to="/autoapply"><img src="telegram-plane.svg" height="31" alt="logo" />  Help</Link></li>
//         </ul>
//       </nav>
//       <div className="logout-section">
//         <button className="logout-btn" onClick={confirmSignOut}>
//           <img src="icons8-power-off-button-35.png" alt="logo" />
//         </button>
//         {/* Display user's name below the button */}
//         {Name && <div className="user-email">{Name}</div>}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Sidebar.css';
// import { useNavigate } from 'react-router-dom';

// const Sidebar = ({ isOpen }) => {
//   const [Name, setName] = useState('');
//   const navigate = useNavigate();

//   // Fetch userName from localStorage when the component mounts
//   useEffect(() => {
//     const storedName = localStorage.getItem('userName');
//     if (storedName) {
//       setName(storedName);
//     }
//   }, []);

//   const handleSignOut = () => {
//     // Clear the token and user details from local storage
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userEmail');
//     localStorage.removeItem('userName');

//     // Redirect to login page
//     navigate('/login');
//   };

//   const confirmSignOut = () => {
//     const confirmLogout = window.confirm('Are you sure you want to log out?');
//     if (confirmLogout) {
//       handleSignOut();
//     }
//   };

//   return (
//     <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
//       <h2><img src="auto-apply.svg" height="31" alt="logo" /> Applify</h2>
//       <nav>
//         <ul>
//           <li><Link to="/autoapply"><img src="automatic.svg" height="31" alt="Auto Apply" /> Auto Apply</Link></li>
//           <li><Link to="/managejobs"><img src="webpack-original.svg" height="31" alt="Manage Jobs" /> Manage Jobs</Link></li>
//           <li><Link to="/statistics"><img src="cloud-jobs-api.svg" height="31" alt="Statistics" /> Statistics</Link></li>
//           <li><Link to="/help"><img src="telegram-plane.svg" height="31" alt="Help" /> Help</Link></li>
//         </ul>
//       </nav>
//       <div className="logout-section">
//         <button className="logout-btn1" onClick={confirmSignOut}>
//           <img src="icons8-power-off-button-50.png" alt="Logout" />Logout
//         </button>
//         {/* Display user's name below the button */}

//       </div>
//     </div>
//   );
// };

// export default Sidebar;



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
