import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Adminheader from './Adminheader';


const Admincategories = () => {

  const [catstate, setCatstate] = useState([])

  function getCategory() {

    axios.get("/categorydata").then(res => {
      const data = res.data;

      setCatstate(data)



    })

  }
  useEffect(() => {
    getCategory()
  }, [])

  function delcategory(_id) {

    axios.delete(`/categorydata/${_id}`).then((res) => {
      console.log("category deleted")
      getCategory();

    })
  }



  let x = 1
    return (
        <div>
          {/* {state.map((item)=>{
            console.log(item)
            return(
              <>
                {item._id}
              </>
            )
          })} */}
        <Adminheader/>
        {/* HEADER */}
        <header id="main-header" className="py-2 bg-success text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-folder" /> Categories</h1>
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
                  <input type="text" className="form-control" placeholder="Search Categories..." />
                  <div className="input-group-append">
                    <button className="btn btn-success">Search</button>
                  </div> 
                </div> */}
              </div>
            </div>
          </div>
        </section>
        {/* CATEGORIES */}
        <section id="categories">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4>Latest Categories</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th />
                      </tr>
                    </thead>
                    {catstate.map((item)=>{
            console.log(item)
            return(
              <>
                    <tbody>
                      <tr>
                        <td>{x++}</td>
                        <td>{item.cname}</td>
                        <td>{item._id}</td>
                        <td>
                          <button onClick={()=>delcategory(item._id)} className="btn btn-secondary" >
                            <i className="fas fa-angle-double-right" /> Delete
                          </button>
                        
                        </td>
                      </tr>
                    </tbody>
                    </>
            )
          })}
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

export default Admincategories;
