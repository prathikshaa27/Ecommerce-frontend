import React, { useState, useEffect } from 'react';
import { updateProfile, fetchUserProfile } from '../services/api';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: '',
    pincode: '',
    mobile: ''
  });

  useEffect(() => {
    fetchUserProfileData();
  }, []);

  const fetchUserProfileData = async () => {
    try {
      const userProfileData = await fetchUserProfile(); 
      setFormData({
        username: userProfileData.username,
        email: userProfileData.email,
        address: userProfileData.profile.address,
        pincode: userProfileData.profile.pincode,
        mobile: userProfileData.profile.mobile
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(formData);
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Edit Profile</h3>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="pincode" className="form-label">Pincode</label>
              <input type="text" className="form-control" id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">Mobile</label>
              <input type="text" className="form-control" id="mobile" name="mobile" value={formData.mobile} onChange={handleInputChange} />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleUpdateProfile}>Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
