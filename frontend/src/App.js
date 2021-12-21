import React,{createContext,useReducer,useState,useEffect} from 'react';
import axios from "axios";
import Navbar from './components/Navbar';
import {Route,Routes} from 'react-router-dom'
import Register from "./components/Users/Register";
import Userlogin from "./components/Users/Login";
import Login from './components/Login';
import Adminlogin from './components/Admin/Adminlogin';
import Admindashboard from './components/Admin/Admindashboard';
import Home from './components/Home';
import Product from './components/Product';
import Category from './components/Category';
import Cart from './components/Cart';
// import Logout from './components/Logout';
import About from './components/About';
import Contact from './components/Contact';
import Adminproduct from './components/Admin/Adminproduct';
import Admincategories from './components/Admin/Admincategories';
import Adminusers from './components/Admin/Adminusers';
import Logout from './components/Users/Logout';
import Productdetails from './components/Productdetails';
import {CartProvider} from "react-use-cart";
import Checkout from './components/Checkout';
import Thankyou from './components/Thankyou';

import {initialState,reducer} from "../src/components/reducer/UseReducer"
import Userprofile from './components/Users/Userprofile';
import Orderdetails from './components/Orderdetails';
import Updateproduct from './components/Admin/Updateproduct';
// import {Elements} from '@stripe/react-stripe-js';
// import {
//   loadStripe
// } from '@stripe/react-stripe-js';
export const UserContext = createContext();

const Routing = () => {

  // const [stripeApiKey,setStripeApiKey]=useState('')

  // async function getStripeApiKey(){
  //   const {data} = await axios.get("/stripeapikey")

  //   setStripeApiKey(data.stripeApiKey)
  // }

  // useEffect(() => {
  //   getStripeApiKey()
  // }, [])

  return (
<CartProvider>
        <Routes>
            <Route extact path="/" element={<Home/>}/>
            <Route extact path="/Product" element={<Product/>}/>
            <Route extact path="/Category" element={<Category/>}/>
            <Route extact path="/Register" element={<Register/>}/>
            {/* <Route extact path="/Login" element={<Login/>}/> */}
            <Route extact path="/Logout" element={<Logout/>}/>
            <Route extact path="/About" element={<About/>}/>
            <Route extact path="/Cart" element={<Cart/>}/>
            <Route extact path="/Contact" element={<Contact/>}/>

             <Route extact path="/Login" element={<Adminlogin/>}/>
             <Route extact path="/Admindashboard" element={<Admindashboard/>}/>
             <Route extact path="/Adminproduct" element={<Adminproduct/>}/>
             <Route extact path="/Admincategories" element={<Admincategories/>}/>
             <Route extact path="/Adminusers" element={<Adminusers/>}/>
             <Route extact path="/Productdetails/:id" element={<Productdetails/>}/>

             <Route extact path="/Userlogin" element={<Userlogin/>}/>
             <Route extact path="/Logout" element={<Userlogin/>}/>
             <Route extact path="/Checkout" element={<Checkout/>}/>

             <Route extact path="/Thankyou" element={<Thankyou/>}/>
             <Route extact path="/Userprofile" element={<Userprofile/>}/>
             <Route extact path="/Orderdetails/:id" element={<Orderdetails/>}/>
             <Route extact path="/Updateproduct/:id" element={<Updateproduct/>}/>

        </Routes>
        </CartProvider>
  )

}




const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)


return (
  <>
  <UserContext.Provider value={{state,dispatch}}>
    <Navbar/>
    <Routing/>

  </UserContext.Provider>
  </>
) 
}

export default App;
