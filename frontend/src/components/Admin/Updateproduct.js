import React,{useState,useEffect} from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { NavItem } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Updateproduct = () => {

    const history = useNavigate();
    const {id}=useParams();
    const [user, setUser] = useState({
        name:"",sku:"",price:"",description:""
      });
    const [imagess,setImagess]=useState();
    const [imageFile,setImageFile]=useState();
    console.log('imageFile',imageFile)
    
    console.log("user",user)
    console.log("id",id)

      let names,values; 

      const handleInputs = (e) => {
          console.log(e)
    
          names=e.target.name;
          values=e.target.value;
    
          setUser({...user,[names]:values})
      }

      function Updateproduct(id) {
        axios.patch(`product/${id}`, {
            name: user.name,
            sku: user.sku,
            price: user.price,
            description: user.description
        }).then(res => {
             console.log(res.user)
             if (res.status === 422 || !res) {
                window.alert("Product not save");
            } else {
                window.alert("Product saved");
                history('/AdminProduct')
            }
        })
    }


    function getProduct(id) {
      axios.get(`product/${id}`).then(res => {
           console.log(res.user)
           setUser(res.data)
      })
  }

    const updateProductImage = async (id, formData) => {
      try {
        const userToken = JSON.parse(localStorage.getItem('token'))
        const headers = {
          Authorization: `Bearer ${userToken && userToken}`,
          'Content-Type': 'multipart/form-data',
        }
        const { data } = await axios.patch(
          `/updateimage/${id}`,
          formData,
          { headers }
        )
        return data.image
      } catch (err) {
       console.log(err)
      }
    }


    const handleUpdateImage = async () => {
      const formData = new FormData()
      formData.append('productImage', imageFile)
  
      console.log('Add product to run')
      const imagePath = await updateProductImage(id, formData)
      setImagess(imagePath)
  
      console.log('update  product image  ran')
  
      setImageFile(null)
    }

    useEffect(() => {
      getProduct(id)
    }, [])

    return (
        <>
                <div class="col-sm-8 offset-4 mt-5 mb-5 col-form-label">
                <h1>UPDATE PRODUCT</h1>
             
                  <div class="form-group w-25">
                    <label htmlFor="title">Name</label>
                    <input name="name" type="text" className="form-control"
                     value= {user.name} onChange={handleInputs} 
                     />
                  </div>
                  <div class="form-group w-25">
                    <label htmlFor="title">sku</label>
                    <input name="sku" type="text" className="form-control"
                     value= {user.sku} onChange={handleInputs} 
                     />
                  </div>
                  <div class="form-group w-25">
                    <label htmlFor="title">price</label>
                    <input  name="price" type="Number" className="form-control"  
                    value= {user.price} onChange={handleInputs}
                    />
                  </div>
                  {/* <div class="form-group">
                    <label >Category</label>
                    <Form.Select
                    aria-label="Default select example"
                    name="category"
                    // onChange={handleInputs}
                  >
                    <option>Category</option>
                    {cate.map((item) => {
                      console.log(item, "items");
                      return <option value={item._id}>{item.cname}</option>;
                    })}
                  </Form.Select>
                  </div> */}
                  {/* <div class="form-group" class="form-group w-25">
                    <label htmlFor="category">Category</label> 
                    <input name="category" type="text" className="form-control"  value= {user.category} onChange={handleInputs}/>
                  </div> */}
                  <div class="form-group w-25">
                    <label htmlFor="body">Description</label>
                    <textarea name="description"  className="form-control" 
                     value= {user.description} onChange={handleInputs} 
                     defaultValue={""} />
                  </div>

                  <div class="form-group w-25">
                    <label htmlFor="image">Upload Image</label>
                    <div className="custom-file">
                      <input type="file"
                       onChange={(e)=>setImageFile(e.target.files[0])}
                       />
                       
                     
                      <button onClick={(e)=>{
                        e.preventDefault();
                        handleUpdateImage();
                      }}>update image</button>
                       <img src={imagess}/>
                  </div>
                  </div>
                  <div className="modal-footer">
                <button className="btn btn-primary"
                 onClick={()=>Updateproduct(id)} 
                >Save Changes</button>
              </div>
                  
        

                </div>
        </>
    )
}

export default Updateproduct
