import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchUserProfile } from '@services/users';
import Header from '@components/header'; 
import Footer from '@components/footer'; 
import './profile.css'

const UserProfile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetchUserProfileData();
  }, []);

  const fetchUserProfileData = async () => {
    try {
      const userProfileData = await fetchUserProfile();
      setUserProfile(userProfileData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleEditProfile = () => {
    navigate('/editprofile');
  };

  return (
    <>
      <Header /> 
      <div className="container profile-container mt-5">
        <div className="profile-card">
          <div className="profile-header">
            <h3>User Profile</h3>
          </div>
          <div className="profile-body">
            {userProfile && (
              <div className="profile-details">
                <p><strong>Username:</strong> {userProfile.username}</p>
                <p><strong>Email:</strong> {userProfile.email}</p>
                {userProfile.profile && (
                  <>
                    <p><strong>Address:</strong> {userProfile.profile.address}</p>
                    <p><strong>Pincode:</strong> {userProfile.profile.pincode}</p>
                    <p><strong>Mobile:</strong> {userProfile.profile.mobile}</p>
                  </>
                )}
                <button className="edit-button" onClick={handleEditProfile}>Edit Profile</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer /> 
    </>
  );
};

export default UserProfile;
