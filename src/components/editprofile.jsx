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
      mobile: '',
      addresses: [], 
    }
  });
  const [showNewAddressField, setShowNewAddressField] = useState(false); 

  useEffect(() => {
    fetchUserProfileData();
  }, []);
  const fetchUserProfileData = async () => {
    try {
      const userProfileData = await fetchUserProfile(); 
      if (userProfileData.profile) {
        userProfileData.profile.addresses = Array.isArray(userProfileData.profile.addresses) ? userProfileData.profile.addresses : [];
      } else {
        userProfileData.profile = {
          address: '', 
          pincode: '',
          mobile: '',
          addresses: [], 
        };
      }
      setFormData(userProfileData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('profile.')) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        profile: {
          ...prevFormData.profile,
          [name.split('.')[1]]: value
        }
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };
  
  const handleAddAddress = () => {
    setShowNewAddressField(true); 
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
                <select className="form-select" name="profile.address" value={formData.profile.address} onChange={handleInputChange}>
                  <option value="">Select Address</option>
                  {formData.profile.address && <option value={formData.profile.address}>{formData.profile.address}</option>}
                  {formData.profile.addresses.map((address, index) => (
                    <option key={index} value={address}>{address}</option>
                  ))}
                </select>
              </div>
              <button type="button" className="btn btn-success mb-3" onClick={handleAddAddress}>Add Address</button>
              {showNewAddressField && ( 
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name={`profile.addresses.${formData.profile.addresses.length}`}
                    value={formData.profile.addresses[formData.profile.addresses.length - 1] || ''} 
                    onChange={handleInputChange}
                  />
                </div>
              )}
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
