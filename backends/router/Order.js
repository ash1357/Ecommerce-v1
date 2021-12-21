const express=require('express');
const router=express.Router();
const order=require("../DB/models/orderdetails")
const authenticate = require('../middleware/authenticate');

router.post("/order",authenticate,async (req,res)=>{
    try{
        const orders = new order(req.body);
        const Addorders = await orders.save();
        res.status(201).send(Addorders);
    }catch(err){
        res.status(400).send(err.message);
    }
})

router.get("/orderdata", async (req, res) => {
    try {
      const orderdata = await order.find().populate("user","name email");
      res.status(201).send(orderdata);
    } catch (e) {
      res.status(400).send(e);
      console.log(e);
    }
  });

  router.get("/getmyorder",authenticate, async (req, res) => {
    try {
      const orderdata = await order.find({user:req.user._id});
      res.status(201).send(orderdata);
    } catch (e) {
      res.status(400).send(e);
      console.log(e);
    }
  }); 

  router.get("/getoneorder/:id", async (req, res) => {
    try {
      const _id = req.params.id;
      const oneorder = await order.findById({ _id: _id });
      res.send(oneorder);
    } catch (e) {
      res.send(e);
    }
  });

module.exports=router