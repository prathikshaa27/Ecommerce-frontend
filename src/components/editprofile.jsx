import React, { useState, useEffect } from 'react';
import { updateProfile, fetchUserProfile } from '@services/api';
import Header from '@components/header';
import Footer from '@components/footer'; 

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    profile: {
      address: '',
      pincode: '',
      mobile: ''
    }
  });

  useEffect(() => {
    fetchUserProfileData();
  }, []);

  const fetchUserProfileData = async () => {
    try {
      const userProfileData = await fetchUserProfile(); 
      setFormData(userProfileData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [fieldName, nestedFieldName] = name.split('.'); 
  
    if (nestedFieldName) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: { ...prevFormData[fieldName], [nestedFieldName]: value } 
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value 
      }));
    }
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
    <>
      <Header />
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
                <input type="text" className="form-control" id="address" name="profile.address" value={formData.profile.address} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="pincode" className="form-label">Pincode</label>
                <input type="text" className="form-control" id="pincode" name="profile.pincode" value={formData.profile.pincode} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">Mobile</label>
                <input type="text" className="form-control" id="mobile" name="profile.mobile" value={formData.profile.mobile} onChange={handleInputChange} />
              </div>
              <button type="button" className="btn btn-primary" onClick={handleUpdateProfile}>Save Changes</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
