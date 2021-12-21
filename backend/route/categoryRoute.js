const express=require('express');
const {createCategory} =require( '../controllers/productController');
// const { isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');

const router=express.Router();

router.route('/newcategory').post(createCategory);
// router.route('/product/new').post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
// router
// .route('/product/:id')
// .put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
// .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
// .get(getProductDetails)

module.exports=router