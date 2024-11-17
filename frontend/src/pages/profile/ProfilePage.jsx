import React, { useEffect, useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profilePicture: 'user.jpg', // Default picture if none is available
    subscription: {
      plan: 'Normal Plan',
      expiryDate: 'No Expiry', // Normal Plan does not expire
      details: 'You can apply for up to 50 jobs per day on each portal. Upgrade to apply for more jobs.',
    },
    jobStats: {
      totalApplied: 150,
      successRate: 99, // Percentage
      applicationsThisMonth: 15,
      applicationsThisWeek: 5,
    },
  });

  // Fetch user data from localStorage when the component mounts
  useEffect(() => {
    const storedName = localStorage.getItem('userName') || 'User Name';
    const storedEmail = localStorage.getItem('userEmail') || 'user@example.com';

    setUserData((prevData) => ({
      ...prevData,
      name: storedName,
      email: storedEmail,
    }));
  }, []);

  return (
    <div className="profile-page">
      <p className="profile-title">User Profile</p>

      <div className="profile-container">
        {/* Left Section - Profile Info */}
        <div className="profile-left">
          <div className="profile-card">
            <img
              src={userData.profilePicture}
              alt="Profile"
              className="profile-picture"
            />
            <h3>{userData.name}</h3>
            <p>{userData.email}</p>
            <button className="btn-edit-profile">Edit Profile</button>
          </div>
        </div>

        {/* Right Section - Stats and Subscription */}
        <div className="profile-right">
          {/* Job Application Statistics */}
          {/* <div className="job-stats">
            <h3>Job Application Statistics</h3>
            <div className="stats-details">
              <p>
                <strong>Total Jobs Applied:</strong> {userData.jobStats.totalApplied}
              </p>
              <p>
                <strong>Success Rate:</strong> {userData.jobStats.successRate}%
              </p>
              <p>
                <strong>Applications This Month:</strong> {userData.jobStats.applicationsThisMonth}
              </p>
              <p>
                <strong>Applications This Week:</strong> {userData.jobStats.applicationsThisWeek}
              </p>
            </div>
          </div> */}

          {/* Subscription Details */}
          <div className="subscription-details">
            <h3>Subscription Plan</h3>
            <p>
              <strong>Plan:</strong> {userData.subscription.plan}
            </p>
            <p>
              <strong>Details:</strong> {userData.subscription.details}
            </p>
            <button className="btn-manage-subscription">Subscribe for Premium</button>
          </div>

          {/* Password Change */}
          <div className="profile-actions">
            <button className="btn-change-password">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

