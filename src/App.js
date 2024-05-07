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
import HeaderFooter from './components/headerfooter';
import CartPage from './components/cart';

function App() {
  return (
    <div>
    
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
         <Route path="/dashboard" element={<Dashboard/>}/> 
         <Route path='/profile' element={<HeaderFooter><UserProfile/></HeaderFooter>}/>
         <Route path='/editprofile' element={<HeaderFooter><EditProfile/></HeaderFooter>}/>
         <Route path="/products/:productId" element={<HeaderFooter><ProductDetailPage/></HeaderFooter>}/>
          <Route path="/cart" element ={<CartPage/>}/> 
      
        
      </Routes>
   
    </div>
  );
}

export default App;
