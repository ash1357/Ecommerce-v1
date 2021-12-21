const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const authenticate = require("../middleware/authenticate");

router.post("/payment/process",authenticate,async(req,res)=>{
    try{
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "inr",
            metadata: {
              company: "Ecommerce",
            },
          });
        
          res.status(200).json({ success: true, client_secret: myPayment.client_secret });
    }
    catch(err){
     console.log(err)
    }
})

router.get("/stripeapikey",authenticate,async(req,res)=>{
    try{
        res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
    }
    catch(err){
     console.log(err)
    }
})



module.exports=router;