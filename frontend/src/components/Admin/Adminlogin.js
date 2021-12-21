import React,{useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Route,Routes} from 'react-router-dom'
// import Admindashboard from "./Admindashboard";
// import Adminproduct from './Adminproduct';
// import Admincategories from './Admincategories';
// import Adminusers from './Adminusers';

// <Routes>
//  <Route extact path="/Admindashboard" element={<Admindashboard/>}/>
//  <Route extact path="/Adminproduct" element={<Adminproduct/>}/>
//  <Route extact path="/Admincategories" element={<Admincategories/>}/>
//  <Route extact path="/Adminusers" element={<Adminusers/>}/>

// </Routes>

const Adminlogin = () => {


    const navigate=useNavigate()

    const handleChange= ()=>{
        // <Admindashboard/>
        
        navigate('/Admindashboard')
        console.log("object")
    }

    return (
        <div>
        {/* <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
          <div className="container">
            <a href="index.html" className="navbar-brand">Blogen</a>
          </div>
        </nav> */}

        {/* HEADER */}

        {/* <header id="main-header" className="py-2 bg-primary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-user" /> Blogen Admin</h1>
              </div>
            </div>
          </div>
        </header> */}

        {/* ACTIONS */}
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
            </div>
          </div>
        </section>
        {/* LOGIN */}
        <section id="login">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card">
                  <div className="card-header">
                    <h4>Account Login</h4>
                  </div>
                  <div className="card-body">
                    <form action="index.html">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <input  onClick={handleChange} defaultValue="Login" className="btn btn-primary btn-block" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* FOOTER */}
        <footer id="main-footer" className="bg-dark text-white mt-5 p-5">
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="lead text-center">
                  Copyright ©
                  <span id="year" />
                  Blogen
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
}

export default Adminlogin
