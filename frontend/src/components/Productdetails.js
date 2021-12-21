import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Link, useParams} from 'react-router-dom';
import { useCart } from 'react-use-cart';

const Productdetails = () => {

  const {id}=useParams();
  const [details,setDetails]=useState({})
  console.log(details,"details")
  const {addItem}=useCart();

  const Productdetail = async (id) => {
    try {
        const {data} = await axios.get(`/product/${id}`);
      setDetails(data);
      console.log("category:", data);
    } catch (error) {
      console.log("err:", error);
    }
  };

  useEffect(() => {
    Productdetail(id);
  }, []);

    return (
      <div className="site-wrap">
      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0"><a href="index.html">Home</a> <span className="mx-2 mb-0">/</span> <strong className="text-black">Tank Top T-Shirt</strong></div>
          </div>
        </div>
      </div>  
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src={details.productImage} alt="Image" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h2 className="text-black">{details.name}</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, vitae, explicabo? Incidunt facere, natus soluta dolores iusto! Molestiae expedita veritatis nesciunt doloremque sint asperiores fuga voluptas, distinctio, aperiam, ratione dolore.</p>
              <p className="mb-4">Ex numquam veritatis debitis minima quo error quam eos dolorum quidem perferendis. Quos repellat dignissimos minus, eveniet nam voluptatibus molestias omnis reiciendis perspiciatis illum hic magni iste, velit aperiam quis.</p>
              <p><strong className="text-primary h4">{details.price}</strong></p>
              {/* <div className="mb-1 d-flex">
                <label htmlFor="option-sm" className="d-flex mr-3 mb-3">
                  <span className="d-inline-block mr-2" style={{top: '-2px', position: 'relative'}}><input type="radio" id="option-sm" name="shop-sizes" /></span> <span className="d-inline-block text-black">Small</span>
                </label>
                <label htmlFor="option-md" className="d-flex mr-3 mb-3">
                  <span className="d-inline-block mr-2" style={{top: '-2px', position: 'relative'}}><input type="radio" id="option-md" name="shop-sizes" /></span> <span className="d-inline-block text-black">Medium</span>
                </label>
                <label htmlFor="option-lg" className="d-flex mr-3 mb-3">
                  <span className="d-inline-block mr-2" style={{top: '-2px', position: 'relative'}}><input type="radio" id="option-lg" name="shop-sizes" /></span> <span className="d-inline-block text-black">Large</span>
                </label>
                <label htmlFor="option-xl" className="d-flex mr-3 mb-3">
                  <span className="d-inline-block mr-2" style={{top: '-2px', position: 'relative'}}><input type="radio" id="option-xl" name="shop-sizes" /></span> <span className="d-inline-block text-black"> Extra Large</span>
                </label>
              </div> */}
              <div className="mb-5">
                <div className="input-group mb-3" style={{maxWidth: '120px'}}>
                  <div className="input-group-prepend">
                    <button className="btn btn-outline-primary js-btn-minus" type="button">−</button>
                  </div>
                  <input type="text" className="form-control text-center" defaultValue={1} placeholder aria-label="Example text with button addon" aria-describedby="button-addon1" />
                  <div className="input-group-append">
                    <button className="btn btn-outline-primary js-btn-plus" type="button">+</button>
                  </div>
                </div>
              </div>
              <p><Link
                    to="/Cart"
                    className="buy-now btn btn-sm btn-primary"
                    onClick={() => {
                      let item = {
                        ...details,
                        id: details._id,
                      }
                      addItem(item)
                    }}
                  >
                    Add To Cart
                  </Link></p>
            </div>
          </div>
        </div>
      </div>
     
      
    </div>
    // <h1>{id}</h1>
    )
}

export default Productdetails
