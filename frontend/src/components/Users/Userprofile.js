import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');

 

const Userprofile = () => {

    const [user, setuser] = useState({
        name: "",
        email:"",
        password: ""
    })

    const [userorder,setUserorder]=useState([])
    // console.log(userorder,"userorder")

    function handleChange(e) {

        const newdata = { ...user }
        newdata[e.target.name] = e.target.value
        setuser(newdata)
        // console.log(newdata)
    }


    function Updateuser(id) {
       
        axios.patch(`user/${id}`, {
            name: user.name,
            email: user.email,
            password: user.password
        }).then(res => {
            // console.log(res.user)
        })

    }

    const getAllOrders = async () => {
        try {
            const userToken = JSON.parse(localStorage.getItem('token')).tokens[0].token
            const headers = {
              Authorization: `Bearer ${userToken && userToken}`,
            }
          const res = await axios.get("/getmyorder",{ headers });
          setUserorder(res.data);
          // console.log("setUserorder", res.data);
        } catch (error) {
          // console.log("err:", error);
        };
      };

      // const razorPayHandler = async (e) => {
      //     e.preventDefault()
      //   try {
      //     const res = await axios.get("/razorpay");
      //     setUserorder(res.data);
      //     console.log("setUserorder", res.data);
      //   } catch (error) {
      //     console.log("err:", error);
      //   };
      // };

    const handlePlaceOrder = (e) => {
        e.preventDefault()
        const userid = JSON.parse(localStorage.getItem('token'))._id;
        Updateuser(userid)
      }

      useEffect(() => {
        getAllOrders()
      }, [])

      let x=1;
    return (
        <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossOrigin="anonymous" />
        <link rel="stylesheet" href="css/style.css" />
        <title>Bootstrap Theme</title>
        {/* <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
          <div className="container">
            <a href="index.html" className="navbar-brand">Blogen</a>
            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav">
                <li className="nav-item px-2">
                  <a href="index.html" className="nav-link">Dashboard</a>
                </li>
                <li className="nav-item px-2">
                  <a href="posts.html" className="nav-link">Posts</a>
                </li>
                <li className="nav-item px-2">
                  <a href="categories.html" className="nav-link">Categories</a>
                </li>
                <li className="nav-item px-2">
                  <a href="users.html" className="nav-link">Users</a>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown mr-3">
                  <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                    <i className="fas fa-user" /> Welcome Brad
                  </a>
                  <div className="dropdown-menu">
                    <a href="profile.html" className="dropdown-item">
                      <i className="fas fa-user-circle" /> Profile
                    </a>
                    <a href="settings.html" className="dropdown-item">
                      <i className="fas fa-cog" /> Settings
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <a href="login.html" className="nav-link">
                    <i className="fas fa-user-times" /> Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav> */}
        {/* HEADER */}
        {/* <header id="main-header" className="py-2 bg-primary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-user" /> Edit Profile</h1>
              </div>
            </div>
          </div>
        </header> */}
        {/* ACTIONS */}
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <Link to="/" href="index.html" className="btn btn-light btn-block">
                  <i className="fas fa-arrow-left" /> Back To Home
                </Link>
              </div>
              <div className="col-md-3">
                <a href="#" className="btn btn-success btn-block">
                  <i className="fas fa-lock" /> Update Profile
                </a>
              </div>
              <div className="col-md-3">
                <a href="#" className="btn btn-danger btn-block">
                  <i className="fas fa-trash" /> Delete Account
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* PROFILE */}
        <section id="profile">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header"> 
                    <h4>Edit Profile</h4>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input name="name" value={user.name} onChange={handleChange} type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input name="email" value={user.email} onChange={handleChange} type="email" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input name="password" value={user.password} onChange={handleChange} type="password" className="form-control" />
                      </div>
                      <button onClick={handlePlaceOrder} className="form-group" data-dismiss="modal">Save Changes</button>
                    </form>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3">
                <h3>Your Avatar</h3>
                <img src="img/avatar.png" alt="" className="d-block img-fluid mb-3" />
                <button className="btn btn-primary btn-block">Edit Image</button>
                <button className="btn btn-danger btn-block">Delete Image</button>
              </div>
            </div>
          </div>
        </section>
        <section id="posts">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header">
                    <h4>My orders</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Order ID</th>
                        <th>Order Items</th>
                        <th>Order Price</th>
                        <th>Date</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                    {userorder.map((data)=>{
                        return(
                          <>
                          <tr>
                        <td>{x++}</td>
                        <td>{data._id}</td>
                        <td>{data.orderItems.length}</td>
                        <td>{data.totalPrice}</td>
                        <td>{new Date(data.createdAt).toLocaleDateString()}</td>
                        <td>
                          <Link to={`/Orderdetails/${data._id}`} className="btn btn-secondary">
                            <i className="fas fa-angle-double-right" /> Details
                          </Link>
                        </td>
                      </tr>

                          </>
                        )
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
        {/* MODALS */}
        {/* ADD POST MODAL */}
        <div className="modal fade" id="addPostModal">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Add Post</h5>
                <button className="close" data-dismiss="modal">
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Upload Image</label>
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="image" />
                      <label htmlFor="image" className="custom-file-label">Choose File</label>
                    </div>
                    <small className="form-text text-muted">Max Size 3mb</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="body">Body</label>
                    <textarea name="editor1" className="form-control" defaultValue={""} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" data-dismiss="modal">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
        {/* ADD CATEGORY MODAL */}
        <div className="modal fade" id="addCategoryModal">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Add Category</h5>
                <button className="close" data-dismiss="modal">
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" data-dismiss="modal">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
    
        {/* ADD USER MODAL */}
        <div className="modal fade" id="addUserModal">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-warning text-white">
                <h5 className="modal-title">Add User</h5>
                <button className="close" data-dismiss="modal">
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" className="form-control" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-warning" data-dismiss="modal">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Userprofile
