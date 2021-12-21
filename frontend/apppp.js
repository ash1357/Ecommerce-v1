import React,{useState,useEffect} from 'react'
import axios from "axios";
import { NavLink } from 'react-router-dom';
import {Form} from 'react-bootstrap'

const Admindashboard = () => {

  // const [uploading, setuploading] = useState(false)
  const [image, setImage] = useState('')
  const [category, setCategory] = useState({
   cname:""
  })
  const [user, setData] = useState({
    name:"",sku:"",category:"",price:"",description:""
  });
  const [cate,setCate]=useState([]);
  const [order,setOrder]=useState([]);
  console.log("orders",order)
  
  console.log("user",user)

  let names,values;

  const handleInputs = (e) => {
      console.log(e)

      names=e.target.name;
      values=e.target.value;

      setData({...user,[names]:values})
  }
 

  const postUser=async (e)=> {
    e.preventDefault();
      console.log("object")
        const {name,category,description,price,sku}=user;

        const res=await fetch("/createproduct",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
              name,category,description,price,sku
            })
        }) 
  }

  let name,value;

  const handleInput = (e) => {
      console.log(e)

      name=e.target.name;
      value=e.target.value;

      setCategory({...category,[name]:value})
  }


  const postUsers=async (e)=> {
    e.preventDefault();
      console.log("object")
        const {cname}=category;

        const res=await fetch("/categories",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
              cname
            })
        }) 

        const data=await res.json();

        if(res.status === 400 || !data){
            window.alert("INVALID REGISTRATION")
        }else{
            window.alert("REGISTRATION SUCCESSFUL")
        }
  }

  const getAllCategory = async () => {
    try {
      const res = await axios.get("/categorydata");
      setCate(res.data);
      console.log("category:", res.data);
    } catch (error) {
      console.log("err:", error);
    }
  };

  const getAllOrders = async () => {
    try {
      const res = await axios.get("/orderdata");
      setOrder(res.data);
      console.log("setOrders:", res.data);
    } catch (error) {
      console.log("err:", error);
    };
  };

  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0]
  //   const formData= new FormData()
  //   formData.append('image',file)
  //   // setuploading(true)

  //   try {
  //     const config = {
  //       headers:{
  //         'Content-Type':'multipart/form-data'
  //       }
  //     }

  //     const {data}=await axios.post('/upload',formData,config)
  //     setImage(data)
  //     // setuploading(false)
  //   } catch (error) {
  //     console.error(error)
  //     // setuploading(false)
  //   }
  // }



  useEffect(() => {
    getAllCategory();
    getAllOrders();
  }, []);

  let x=1;
    return (
        <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
          <div className="container">
            <a href="index.html" className="navbar-brand">Blogen</a>
            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav">
                <li className="nav-item px-2">
                  <NavLink to="/Admindashboard" className="nav-link active">Dashboard</NavLink>
                </li>
                <li className="nav-item px-2">
                  <NavLink to="/AdminProduct" className="nav-link">Product</NavLink>
                </li>
                <li className="nav-item px-2">
                  <NavLink to="/Admincategories" className="nav-link">Categories</NavLink>
                </li>
                <li className="nav-item px-2">
                  <NavLink to="/Adminusers" className="nav-link">Users</NavLink>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown mr-3">
                  <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                    <i className="fas fa-user" /> Welcome Brad
                  </a>
                  <div className="dropdown-menu">
                    <NavLink to="/Adminprofile" className="dropdown-item">
                      <i className="fas fa-user-circle" /> Profile
                    </NavLink>
                    <NavLink to="/Adminsettings" className="dropdown-item">
                      <i className="fas fa-cog" /> Settings
                    </NavLink>
                  </div>
                </li>
                <li className="nav-item">
                  <NavLink to="/Login" className="nav-link">
                    <i className="fas fa-user-times" /> Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* HEADER */}
        <header id="main-header" className="py-2 bg-primary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-cog" /> Dashboard</h1>
              </div>
            </div>
          </div>
        </header>
        {/* ACTIONS */}
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <a href="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addPostModal">
                  <i className="fas fa-plus" /> Add Product
                </a>
              </div>
              <div className="col-md-3">
                <a href="#" className="btn btn-success btn-block" data-toggle="modal" data-target="#addCategoryModal">
                  <i className="fas fa-plus" /> Add Category
                </a>
              </div>
              <div className="col-md-3">
                <a href="#" className="btn btn-warning btn-block" data-toggle="modal" data-target="#addUserModal">
                  <i className="fas fa-plus" /> Add User
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* POSTS */}
        <section id="posts">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header">
                    <h4>Latest Posts</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Total Price</th>
                        <th>Date</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {/* {order.map((data)=>{
                        return(
                          <>
                          <tr>
                        <td>{x++}</td>
                        <td>{data.user.name}</td>
                        <td>{data.totalPrice}</td>
                        <td>{new Date(data.createdAt).toLocaleDateString()}</td>
                        <td>
                          <a href="details.html" className="btn btn-secondary">
                            <i className="fas fa-angle-double-right" /> Details
                          </a>
                        </td>
                      </tr>

                          </>
                        )
                      })} */}
                    
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center bg-primary text-white mb-3">
                  <div className="card-body">
                    <h3>Posts</h3>
                    <h4 className="display-4">
                      <i className="fas fa-pencil-alt" /> 6
                    </h4>
                    <a href="posts.html" className="btn btn-outline-light btn-sm">View</a>
                  </div>
                </div>
                <div className="card text-center bg-success text-white mb-3">
                  <div className="card-body">
                    <h3>Categories</h3>
                    <h4 className="display-4">
                      <i className="fas fa-folder" /> 4
                    </h4>
                    <a href="categories.html" className="btn btn-outline-light btn-sm">View</a>
                  </div>
                </div>
                <div className="card text-center bg-warning text-white mb-3">
                  <div className="card-body">
                    <h3>Users</h3>
                    <h4 className="display-4">
                      <i className="fas fa-users" /> 4
                    </h4>
                    <a href="users.html" className="btn btn-outline-light btn-sm">View</a>
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
                    <label htmlFor="title">Name</label>
                    <input name="name" type="text" className="form-control" value= {user.name} onChange={handleInputs} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">sku</label>
                    <input name="sku" type="text" className="form-control" value= {user.sku} onChange={handleInputs} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">price</label>
                    <input  name="price" type="Number" className="form-control"  value= {user.price} onChange={handleInputs}/>
                  </div>
                  <div class="form-group">
                    <label >Category</label>
                    <Form.Select
                    aria-label="Default select example"
                    name="category"
                    onChange={handleInputs}
                  >
                    <option>Category</option>
                    {cate.map((item) => {
                      console.log(item, "items");
                      return <option value={item._id}>{item.cname}</option>;
                    })}
                  </Form.Select>
                  </div>
                  {/* <div className="form-group">
                    <label htmlFor="category">Category</label> 
                    <input name="category" type="text" className="form-control"  value= {user.category} onChange={handleInputs}/>
                  </div> */}
                  <div className="form-group">
                    <label htmlFor="body">Description</label>
                    <textarea name="description"  className="form-control"  value= {user.description} onChange={handleInputs} defaultValue={""} />
                  </div>

                  <Form.Group className="form-group">
                    <label htmlFor="image">Upload Image</label>
                    <div className="custom-file">
                      <input type="file" name='image' value={image} onChange={uploadFileHandler} type="file" className="custom-file-input" id="image" />
                      <label htmlFor="image" className="custom-file-label">Choose File</label>
                    </div>
                   {/* {uploading} */}
                  </Form.Group>
                  {/* <Form.Group className="form-group">
                    <Form.Label htmlFor="image">Upload Image</Form.Label>
                    <Form.Control className="custom-file">
                      <input name='image' value={user.image} onChange={handleInputs} type="file" className="custom-file-input" id="image" />
                      <label htmlFor="image" className="custom-file-label">Choose File</label>
                    </Form.Control>
                    <Form.File></Form.File>
                  </Form.Group> */}

                </form>
              </div> 
             <div className="modal-footer">
                <button className="btn btn-primary" onClick={postUser} data-dismiss="modal">Save Changes</button>
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
                    <label htmlFor="title">Name</label>
                    <input name="cname" type="text" className="form-control" value={category.name}  onChange={handleInput}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Upload Image</label>
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="image" />
                      <label htmlFor="image" className="custom-file-label">Choose File</label>
                    </div>
                    <small className="form-text text-muted">Max Size 3mb</small>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button onClick={postUsers} className="btn btn-success" data-dismiss="modal">Save Changes</button>
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

export default 
