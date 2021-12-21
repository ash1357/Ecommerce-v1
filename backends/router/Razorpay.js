const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const shortId = require("shortid");
const Order=require("../DB/models/orderdetails")


var razorpay = new Razorpay({
    key_id: "rzp_test_fI3svym89jQMr0",
    key_secret: "7qefFXSkUet6JqKUxIyjHySU",
  });
  
  router.post("/razorpay", async (req, res) => {
    
    const payment_capture = 1;
    console.log("eq.body", req.body);
  
    
    try {
      const response = await razorpay.orders.create({
        amount: req.body.onlineProduct.totalPrice * 100,
        currency: "INR",
        receipt: shortId.generate(),
        payment_capture,
      });
      console.log("response", response);
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (error) {
      console.log(error);
    }
  });

module.exports=router;