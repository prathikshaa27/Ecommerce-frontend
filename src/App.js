import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from '@users/signup.jsx'; 
import Signin from '@users/signin'; 
import HomePage from '@components/home'; 
import Dashboard from '@product/dashboard'; 
import ProductDetailPage from '@product/product'; 
import UserProfile from '@components/profile'; 
import EditProfile from '@components/editprofile'; 
import CartPage from '@product/cart'; 
import Orders from '@product/orders'; 

function App() {
  return (
    <div>
    
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/signupform" element={<Signup />} />
        <Route path="/signinform" element={<Signin />} />
         <Route path="/home" element={<HomePage/>}/> 
         <Route path="/dashboard" element ={<Dashboard/>}/>
         <Route path='/profile' element={<UserProfile/>}/>
         <Route path='/editprofile' element={<EditProfile/>}/>
         <Route path="/products/:productId" element={<ProductDetailPage/>}/>
          <Route path="/products/:productId/cart" element ={<CartPage/>}/> 
          <Route path="/orders" element={<Orders/>}/>
      </Routes>
   
    </div>
  );
}

export default App;

