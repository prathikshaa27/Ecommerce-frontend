import './App.css';
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Signup from './components/signup';
import Signin from './components/signin';
import HomePage from './components/home';
import Dashboard from './components/dashboard';
import ProductDetailPage from './components/productpage';
import UserProfile from './components/profile';
import EditProfile from './components/editprofile';

function App() {
  return (
    <div>
   
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
         <Route path="/dashboard" element={<Dashboard/>}/> 
         <Route path='/profile' element={<UserProfile/>}/>
         <Route path='/editprofile' element={<EditProfile/>}/>
         <Route path="/products/:productId" element={<ProductDetailPage/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
