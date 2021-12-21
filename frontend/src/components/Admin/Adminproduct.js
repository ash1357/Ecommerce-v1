import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import Adminheader from './Adminheader';

const Adminproduct = () => {

  const [prostate, setProstate] = useState([]);
    const [product, setProduct] = useState({
        name: "",
        sku: "",
        category: "",
        price: "",
        description: ""
    });
    const [skip,setSkip]=useState(0);
    const [keyword,setkeyword]=useState('');
    const [totalResults, setTotalResults] = useState(0)
     const limit=100


    function handleChange(e) {

        const newdata = { ...product }
        newdata[e.target.name] = e.target.value
        setProduct(newdata)
        console.log(newdata)
    }

    // function getProducts(e) {
    //     axios.get("/products").then(res => {
    //         const data = res.data;
    //         setProstate(data)
    //         console.log("Data", data)
    //     })
    // }

    const getProducts = async (limit, skip, keyword) => {
      try {
        const res = await axios.get(`/products`, {
          params: { limit, skip, keyword },
        });
        const data = res.data;
        setProstate(data.products);
      } catch (error) {
        console.log("err:", error);
      }
    };

    

    // const getProducts = async (limit, skip, keyword, category) => {
    //   try {
    //     const res = await axios.get(`/products`, {
    //       params: { limit, skip, keyword, category },
    //     });
        
    //     setProstate(res.data.products);
    //     console.log("category:", res.data);
    //     return res.data.totalResults
       
    //   } catch (error) {
    //     console.log("err:", error);
    //   }
      
    // };


    useEffect(() => {
      const populateProducts = async () => {
        setTotalResults(await getProducts(limit, skip, keyword))
      }
      populateProducts();
        getProducts();

    }, [limit, skip, keyword])


    function delproduct(_id) {
        console.log(_id, "ndjndnbbd")
        axios.delete(`/products/${_id}`).then((res) => {
            console.log("product deleted")
            getProducts(limit, skip, keyword);

        })
    }



    // function updateproduct(id) {


    //     console.log(id, "ndjndnbbd")
    //     axios.patch(`/products/${id}`).then((res) => {

    //         console.log("product updated")
    //         getProducts();

    //     })
    // }


    let x = 1
    return (
        <div>
          {/* {state.map((item)=>{
            console.log(item)
            return(
              <>
                {item.name}
              </>
            )
          })} */}

       <Adminheader/>
        {/* HEADER */}
        <header id="main-header" className="py-2 bg-primary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-pencil-alt" /> Posts</h1>
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
                  <input type="text" className="form-control" placeholder="Search Posts..." />
                  <div className="input-group-append">
                    <button className="btn btn-primary">Search</button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
        {/* POSTS */}
        <section id="posts">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4>Latest Products</h4>
                  </div>
              
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Sku</th>
                        <th>Description</th>
                        <th />
                      </tr>
                    </thead>
                    {prostate.map((item)=>{
            console.log(item)
            return(
              <>
               
              <tbody>
                      <tr>
                        <td>{x++}</td>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.price}</td>
                        <td>{item.sku}</td>
                        <td>{item.description}</td>
                        <td>
                        <button onClick={()=>delproduct(item._id)} className="btn btn-secondary" >
                            <i className="fas fa-angle-double-right" /> Delete
                          </button>
                          <Link to={`/Updateproduct/${item._id}`} className="btn btn-primary btn-block" data-toggle="modal" data-target="#addPostModal">
                            <i className="fas fa-plus" />Update
                          </Link>
                        </td>
                      </tr>

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
                    <input name="name" type="text" className="form-control"
                     value= {prostate.name} onChange={handleChange} 
                     />
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">sku</label>
                    <input name="sku" type="text" className="form-control"
                     value= {prostate.sku} onChange={handleChange}
                      />
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">price</label>
                    <input  name="price" type="Number" className="form-control"
                      value= {prostate.price} onChange={handleChange}
                      />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label> 
                    <input name="category" type="text" className="form-control"
                      value= {prostate.category} onChange={handleChange}
                      />
                  </div>
                  <div className="form-group">
                    <label htmlFor="body">Description</label>
                    <textarea name="description"  className="form-control"
                      value= {prostate.description} onChange={handleChange} defaultValue={""} 
                      />
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
                            <button  className="btn btn-primary"  data-dismiss="modal">Save Changes</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    </tbody>  

                    
                    </>
                    
            )
          })}
                  </table>
                  {/* PAGINATION */}
                  <nav className="ml-4">
                    <ul className="pagination">
                      <li className="page-item disabled">
                        <a href="#" className="page-link">Previous</a>
                      </li>
                      <li className="page-item active">
                        <a href="#" className="page-link">1</a>
                      </li>
                      <li className="page-item">
                        <a href="#" className="page-link">2</a>
                      </li>
                      <li className="page-item">
                        <a href="#" className="page-link">3</a>
                      </li>
                      <li className="page-item">
                        <a href="#" className="page-link">Next</a>
                      </li>
                    </ul>
                  </nav>
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

export default Adminproduct
