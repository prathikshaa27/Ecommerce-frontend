import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../services/api';

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
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">User Profile</h3>
        </div>
        <div className="card-body">
          {userProfile && (
            <div>
              <p><strong>Username:</strong> {userProfile.username}</p>
              <p><strong>Email:</strong> {userProfile.email}</p>
              {userProfile.profile && (
                <>
                  <p><strong>Address:</strong> {userProfile.profile.address}</p>
                  <p><strong>Pincode:</strong> {userProfile.profile.pincode}</p>
                  <p><strong>Mobile:</strong> {userProfile.profile.mobile}</p>
                </>
              )}
              <button className="btn btn-primary" onClick={handleEditProfile}>Edit Profile</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
