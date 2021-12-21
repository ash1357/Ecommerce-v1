import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import axios from "axios";
import Adminheader from './Adminheader';

const Adminusers = () => {
  
  const [users, setUsers] = useState([])
    console.log("users",users)

  const getUser = async (id) => {
      try {
          const {data} = await axios.get('/user');
          setUsers(data);
      //   console.log("details:", data);
      } catch (error) {
        console.log("err:", error);
      }
    };

    useEffect(() => {
      getUser()
    }, [])

    let x=1;
    return (
        <div>
         <Adminheader/>
        {/* HEADER */}
        <header id="main-header" className="py-2 bg-warning text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-users" /> Users</h1>
              </div>
            </div>
          </div>
        </header>
        {/* SEARCH */}
        <section id="search" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-6 ml-auto">
                {/* <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search Users..." />
                  <div className="input-group-append">
                    <button className="btn btn-warning">Search</button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
        {/* USERS */}
        <section id="users">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4>Latest Users</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((el)=>{
                        return(<>
                        <tr>
                        <td>{x++}</td>
                        <td>{el.name}</td>
                        <td>{el.email}</td>
                        <td>{el.phone}</td>
                        {/* <td>
                          <a href="details.html" className="btn btn-secondary">
                            <i className="fas fa-angle-double-right" /> Details
                          </a>
                        </td> */}
                      </tr>
                        </>)
                      })}
                      
                    </tbody>
                  </table>
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

export default Adminusers
