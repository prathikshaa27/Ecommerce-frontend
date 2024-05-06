import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: '',
    pincode: '',
    mobile: ''
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/profile/', { withCredentials: true });
      const userProfile = response.data;
      setFormData({
        username: userProfile.username,
        email: userProfile.email,
        address: userProfile.profile.address,
        pincode: userProfile.profile.pincode,
        mobile: userProfile.profile.mobile
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
      const response = await axios.put('http://localhost:8000/api/profile/', formData, { withCredentials: true });
      console.log(response)
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
