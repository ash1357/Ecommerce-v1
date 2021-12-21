import React, { useState,useEffect,useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink,Link} from 'react-router-dom';
// import Register from './components/Register';
import Login from './Login';
import Home from './Home';
 import Product from './Product';
// import Category from './components/Category';
import Cart from './Cart';
// import Logout from './components/Logout';
import About from './About';
import Contact  from './Contact';
import { UserContext } from '../App';
import { useCart } from "react-use-cart";


const Navbar = () => {
  const [item,setItem]=useState('')
  console.log("item",item)

  const {state,dispatch}=useContext(UserContext);

  const {
    totalUniqueItems,
  } = useCart();
  console.log(totalUniqueItems,"totalUniqueItems")

  // useEffect(() => {
  //   setItem(JSON.parse(localStorage.getItem("token")))
  // }, [])

  const RenderMenu = () =>{

    if(state){
    return(<>
     {/* <li> <NavLink to="/Login"><span className="icon icon-person" />Admin</NavLink></li> */}
                      {/* <li> <NavLink to="/Userlogin"><span className="icon icon-person" />User</NavLink></li>*/}
                      <li> <NavLink to="/Userprofile"><span className="icon icon-person" />Userprofile</NavLink></li> 
                      <li> <NavLink to="/Logout"><span className="icon icon-person" />Logout</NavLink></li>
                      <li><a href="#"><span className="icon icon-heart-o" /></a></li>
                      <li>
                        <NavLink to="/cart" className="site-cart">
                          <span className="icon icon-shopping_cart" />
                          <span className="count">{totalUniqueItems}</span>
                        </NavLink>
                      </li> 
                      <li className="d-inline-block d-md-none ml-md-0"><a href="#" className="site-menu-toggle js-menu-toggle"><span className="icon-menu" /></a></li>
    </>)
  }else{
    return(<>
     {/* <li> <NavLink to="/Login"><span className="icon icon-person" />Admin</NavLink></li> */}
                      <li> <NavLink to="/Userlogin"><span className="icon icon-person" />User</NavLink></li>
                      <li> <NavLink to="/Register"><span className="icon icon-person" />Signup</NavLink></li>
                      {/* <li> <NavLink to="/Logout"><span className="icon icon-person" />Logout</NavLink></li> */}
                    
                     
                      <li className="d-inline-block d-md-none ml-md-0"><a href="#" className="site-menu-toggle js-menu-toggle"><span className="icon-menu" /></a></li>
    </>)
  }}

    return (
        <>
             <header className="site-navbar" role="banner">
          <div className="site-navbar-top">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-6 col-md-4 order-2 order-md-1 site-search-icon text-left">
                  <form action className="site-block-top-search">
                    <span className="icon icon-search2" />
                    <input type="text" className="form-control border-0" placeholder="Search" />
                  </form>
                </div>
                <div className="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 text-center">
                  <div className="site-logo">
                    <a href="index.html" className="js-logo-clone">Shoppers</a>
                  </div>
                </div>
                <div className="col-6 col-md-4 order-3 order-md-3 text-right">
                  <div className="site-top-icons">
                  <ul>
                     <RenderMenu/>
                    </ul>
                  </div> 
                </div>
              </div>
            </div>
          </div> 
          <nav className="site-navigation text-right text-md-center" role="navigation">
            <div className="container">
              <ul className="site-menu js-clone-nav d-none d-md-block">
                <li className="has-children active">
                  <NavLink to="/">Home</NavLink>
                  <ul className="dropdown">
                    <li><a href="#">Menu One</a></li>
                  </ul>
                </li>
                <li className="has-children">
                  <NavLink to="/About">About</NavLink>
                </li>
                <li><NavLink to="/Product">Shop</NavLink></li>
                <li><a href="#">Catalogue</a></li>
                <li><a href="#">New Arrivals</a></li>
                <li><NavLink to="/Contact">Contact</NavLink></li>
              </ul>
            </div>
          </nav>
        </header>

        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
                <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item active">
                <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
             <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/register">Register</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/logout">Logout</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/product">Product</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/category">Category</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/cart">Cart</NavLink>
            </li>
            
         </ul>
    
  </div>
</nav> */}




        </>
    )
}

export default Navbar
