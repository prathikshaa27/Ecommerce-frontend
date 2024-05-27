import Signup from '../src/components/users/signup' 
import Signin from '../src/components/users/signin'; 
import HomePage from '../src/components/dashboard/home'; 
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../src/components/dashboard/dashboard'; 
import ProductDetailPage from '../src/components/products/product'; 
import UserProfile from '../src/components/users/profile'; 
import EditProfile from '../src/components/users/editprofile'; 
import CartPage from '../src/components/products/cart'; 
import Orders from '../src/components/products/orders'; 
import ProtectedRoute from './protectedroute';

import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/signupform" element={<Signup />} />
        <Route path="/signinform" element={<Signin />} />
        <Route path="/home" element={<HomePage/>}/> 
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/profile" element={<ProtectedRoute><UserProfile/></ProtectedRoute>}/>
        <Route path="/editprofile" element={<ProtectedRoute><EditProfile/></ProtectedRoute>}/>
        <Route path="/products/:productId" element={<ProductDetailPage/>}/>
        <Route path="/products/:productId/cart" element={<CartPage/>}/> 
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
    </div>
  );
}

export default App;
