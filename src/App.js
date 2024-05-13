import './App.css';
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Signup from './users/signup.jsx'
import Signin from './users/signin';
import HomePage from './components/home';
import Dashboard from './products/dashboard';
import ProductDetailPage from './components/product';
import UserProfile from './components/profile';
import EditProfile from './components/editprofile';
import HeaderFooter from './components/headerfooter';
import CartPage from './components/cart';
import Orders from './components/orders';

function App() {
  return (
    <div>
    
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/signupform" element={<Signup />} />
        <Route path="/signinform" element={<Signin />} />
         <Route path="/home" element={<HomePage/>}/> 
         <Route path="/dashboard" element ={<Dashboard/>}/>
         <Route path='/profile' element={<HeaderFooter><UserProfile/></HeaderFooter>}/>
         <Route path='/editprofile' element={<HeaderFooter><EditProfile/></HeaderFooter>}/>
         <Route path="/products/:productId" element={<HeaderFooter><ProductDetailPage/></HeaderFooter>}/>
          <Route path="/products/:productId/cart" element ={<CartPage/>}/> 
          <Route path="/orders" element={<Orders/>}/>
      
        
      </Routes>
   
    </div>
  );
}

export default App;

