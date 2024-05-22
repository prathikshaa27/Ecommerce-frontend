import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile, fetchUserProfile } from '@services/api';
import Header from '@components/header';
import Footer from '@components/footer';
import './editprofile.css';

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
  const [newAddress, setNewAddress] = useState('');
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

  const handleNewAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleSaveNewAddress = () => {
    if (newAddress.trim()) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        profile: {
          ...prevFormData.profile,
          addresses: [...prevFormData.profile.addresses, newAddress],
          address: prevFormData.profile.address || newAddress,
        }
      }));
      setNewAddress('');
      setShowNewAddressField(false);
    } else {
      console.error('New address is empty.');
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
      <div className="container edit-profile-container mt-5">
        <div className="edit-profile-card">
          <div className="edit-profile-header">
            <h3>Edit Profile</h3>
          </div>
          <div className="edit-profile-body">
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <select className="form-control" name="profile.address" value={formData.profile.address} onChange={handleInputChange}>
                  <option value="">Select Address</option>
                  {formData.profile.addresses.map((address, index) => (
                    <option key={index} value={address}>{address}</option>
                  ))}
                </select>
              </div>
              <button type="button" className="btn btn-success mb-3" onClick={handleAddAddress}>Add Address</button>
              {showNewAddressField && (
                <div className="form-group new-address-group">
                  <input
                    type="text"
                    className="form-control"
                    value={newAddress}
                    onChange={handleNewAddressChange}
                    placeholder="Enter new address"
                  />
                  <button type="button" className="btn btn-primary" onClick={handleSaveNewAddress}>Save Address</button>
                </div>
              )}
              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input type="text" className="form-control" id="pincode" name="profile.pincode" value={formData.profile.pincode} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
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
