const express = require("express");
const router = express.Router();
const product = require("../DB/models/productmodel");
const category = require("../DB/models/categorymodel");
const sharp=require("sharp");
const multer =require('multer');
const path =require("path");

const fs=require('fs');


// const storage =multer.diskStorage({
//   destination:function(req,file,cb){
//       cb(null,'./uploads/');
//   },
//   filename:function(req,file,cb){
//     cb(null,new Date().toISOString() + file.originalname);
//   }
// })

// const fileFilter =(req,file,cb)=>{
//   if(file.mimetype ==='image/jpeg'  || file.mimetype ==='image/png'){
//     cb(null,true)
//   }else{
//     cb(null,false)
//   }
// }
const storage=multer.memoryStorage();
// const upload = multer({
//   storage:storage,
//   limits:{
//   fileSize:1024 * 1024 * 5
//   },
//   fileFilter:fileFilter  
// });


const uploads = multer({storage});

// router.get("/users", (req, res) => {
//   res.send("Hello from the user side");
// });

router.post("/createproduct", uploads.single('productImage') ,async function (req, res) {
  // const {name,sku,price,category,description} = req.body;
  console.log("req.file",req.file)
  console.log("req.body",req.body)

  fs.access('uploads',(err)=>{
    if(err){
      fs.mkdirSync('/uploads')
    }
  })

  const date= new Date();
  await sharp(req.file.buffer)
  .resize({width:400,height:400})
  .toFile(`uploads/${date.toString()}${req.file.originalname}`);
  
  const newProduct = await product.create({...req.body, productImage:`uploads/${date.toString()}${req.file.originalname}`});
  
  await category.updateMany(
    { _id: newProduct.category },
    { $push: { products: newProduct._id } }
  );
  return res.status(201).send(newProduct);
});

router.get("/products", async (req, res) => {
  try {
    let searchQuery = ''

    if (req.query.keyword) {
      searchQuery = String(req.query.keyword)
    }

    // for category filter
    if (req.query.category) {
      let categoryQuery = req.query.category
      const findQuery = {
        $and: [
          { category: categoryQuery },
          {
            $or: [
              { name: { $regex: searchQuery, $options: 'i' } },
              { description: { $regex: searchQuery, $options: 'i' } },
            ],
          },
        ],
      }
      const results = await product.find(findQuery)

      const products = await product.find(findQuery)
        .sort('-createdAt')
        // .populate('category', 'title')
        .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip))

      return res.json({ success: true, totalResults: results.length, products })
    }

    const findQuery = {
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
      ],
    }

    const results = await product.find(findQuery)

    const products = await product.find(findQuery)
      .sort('-createdAt')
      // .populate('category', 'title')
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))

    return res.json({ success: true, totalResults: results.length, products })
  }  catch (e) {
    console.log(e)
    res.status(400).json({ success: false, error: e.message })
  }
});      

// router.post("/createproduct", upload.single('productImage') ,async function (req, res) {
//   // const {name,sku,price,category,description} = req.body;
//   console.log("req.file",req.file)
//   const newProduct = await product.create({...req.body, productImage:req.file.path});
  

//   await category.updateMany(
//     { _id: newProduct.category },
//     { $push: { products: newProduct._id } }
//   );

//   return res.send(newProduct);
// });

// router.get("/products", async (req, res) => {
//   try {
//       if(req.query.category){
//         const studentsdata = await product.find({ category: req.query.category })
//         return res.status(200).send(studentsdata)
//       }
//     const studentsdata = await product.find({})
//     res.send(studentsdata);
//   } catch (e) {
//     res.send(e);
//   }
// });            

// router.get("/products/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const productdata = await product.findById({ _id: _id });
//     res.send(productdata);
//   } catch (e) {
//     res.send(e);
//   }
// });

router.get("/product/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const products = await product.findById(_id);
    if(!products){
      return res.status(404).send()
    }else{
      res.status(201).send(products)
    }
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});


router.delete("/products/:id", async (req, res) => {
  try {
    const deleteProduct = await product.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(400).send();
    }
    res.send(deleteProduct);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/product/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateProduct = await product.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(201).send(updateProduct);
  } catch (e) {
    res.status(422).send(e);
  }
});

router.get("/categorydata", async (req, res) => {
    try {
      const categoriesdata = await category.find();
      res.status(201).send(categoriesdata);
    } catch (e) {
      res.status(400).send(e);
      console.log(e);
    }
  });

//   router.get("/pro/:id", async (req, res) => {
//   try {
//     const studentsdata = await product.findById({ category: req.params.id });
//     res.send(studentsdata);
//   } catch (e) {
//     res.send(e);
//   }
// });    

router.get("/categorydata/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const categories = await category.findById(_id)
    if(!categories){
      return res.status(404).send()
    }else{
    res.send(categories) 
    } 
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});


  router.delete("/categorydata/:id", async (req, res) => {
    try {
      const deleteProduct = await category.findByIdAndDelete(req.params.id);
      if (!req.params.id) {
        return res.status(400).send();
      }
      res.status(201).send(deleteProduct);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  router.patch("/categorydata/:id", async (req, res) => {
    try {
      const _id = req.params.id;
      const updateCategory = await category.findByIdAndUpdate(_id, req.body, {
        new: true,
      });
      res.send(updateCategory);
    } catch (e) {
      res.status(500).send(e);
    }
  });

router.post("/categories", async (req, res) => {
  try {
    const cate = new category(req.body);
    const Addcategory = await cate.save();
    res.status(201).send(Addcategory); 
  } catch (e) {
    res.status(400).send(e);
  }});

router.get("/categorydata/:id", async (req, res) => {
    try {
      const _id = req.params.id;
      const categorydata = await category.findById({ _id: _id });
      res.send(categorydata);
    } catch (e) {
      res.send(e);
    }
  });
router.get("/admin", (req, res) => {
  res.send("Hello from the admin side");
});

router.patch(
  "/updateimage/:id",
  uploads.single("productImage"),
  async (req, res) => {
    const date = new Date();
    try {
      const producta = await product.findById(req.params.id);
      console.log("req.file", req.file);

      if (!producta) {
        return res
          .status(404)
          .json({ success: false, error: "Product not found" });
      }

      if (!req.file) throw new Error("please upload an image");
      fs.access("uploads", (err) => {
        if (err) {
          fs.mkdirSync("/uploads");
        }
      });
      fs.unlinkSync(path.resolve(producta.productImage));

      await sharp(req.file.buffer)
        .resize({ width: 400, height: 400 })
        .toFile(`uploads/${date.getTime()}${req.file.originalname}`);

      producta.productImage = `uploads/${date.getTime()}${
        req.file.originalname
      }`;
      await producta.save();
      res.json({
        success: true,
        message: "Image updated",
        image: producta.productImage,
      });
    } catch (err) {
      if (req.file) {
        // fs.unlinkSync(
        //   path.resolve(`uploads/${date.getTime()}${req.file.originalname}`)
        // );
      }
      res.status(400).json({ success: false, error: err.message });
    }
  }
);

module.exports = router;
