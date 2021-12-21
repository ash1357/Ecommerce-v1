const jwt=require('jsonwebtoken');
const express=require('express');
const router=express.Router();
const User=require("../DB/models/usermodel");
const bcrypt=require('bcryptjs');
const authenticate = require('../middleware/authenticate');

router.get('/',(req,res)=>{
    res.send('user panel')
})

router.post("/signup",async (req,res)=>{
    try{
        const {name,email,phone,password,role}=req.body;

        if(!name || !email || !password || !phone){
            return res.status(422).json({error:"please fill all the fields"})
        }

        const userExist=await User.findOne({email})
        if(userExist){
            return res.status(422).json({error:"user already exist"})
        }else{
            const user= new User ({name,email,phone,password})

            const salt=await bcrypt.genSalt(10);
            user.password=await bcrypt.hash(user.password,salt)
        
            const newUser=await user.save();
            
            return res.status(201).json({msg:"User Registered Successfully"})
        } 
        
    }catch(err){
        console.log(err)
    }
})

// router.post("/login",async(req,res)=>{
//     try{
//         const{email,password}=req.body;
//         if(!email || !password){
//             return res.status(422).json({error:"please fill all the fields"})
//         }

//         const userLogin = await User.findOne({email})
//         if(userLogin.role === "admin"){
//             return res.status(201).json({msg:"login as admin"})
//         }else{
//             return res.status(202).json({msg:"login as user"})
//         }
        
//     }catch(err){
//         console.log(err)
//     }
// })

router.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(422).json({error:"please fill all the fields"})
        }
        
        const userLogin = await User.findOne({email})
        if(userLogin){
        // return res.redirect('/admin')
        const isMatch=await bcrypt.compare(password,userLogin.password)

        let token =await userLogin.generateAuthToken()
        // console.log(token)

        // res.cookie("jwtoken",token,{
        //     expires:new Date(Date.now()+258920000),
        //     httpOnly:true
        // })
 
        if(!isMatch){
            return res.status(422).json({err:"INVALID CREDENTIALS"})
        }else{
            return res.status(201).json({msg:"USER LOGIN SUCCESSFULL", token , userLogin})
        }
        }else{
            // return res.redirect('/client')
            return res.status(422).json({error:"invalid credentials"})
        }  
    }catch(err){
        console.log(err) 
    }
})

router.get("/user", async (req, res) => {
    try {
      const Userdata = await User.find();
      res.status(201).send(Userdata);
    } catch (e) {
      res.status(400).send(e);
      console.log(e);
    }
  });

// router.patch('/changePermission/:id',async(req,res)=>{
//     try{
//         const _id=req.params.id;
//         const updateUser=await User.findByIdAndUpdate(_id , req.body ,{
//             new:true
//         })
//        res.send(updateUser);
//     }catch(err){
//         console.log(err)
//     }
// })

// router.get('/post',authenticate,(req,res)=>{
//        res.send(req.rootUser);
// })

router.patch("/user/:id", async (req, res) => {
    try {
      const _id = req.params.id;
      const updateUser = await User.findByIdAndUpdate(_id, req.body, {
        new: true,
      });
      res.status(201).send(updateUser);
    } catch (e) {
      res.status(400).send(e);
    }
  });

router.get('/logout',(req,res)=>{
    console.log('hello my logout page');
    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).send('User logout');
})

module.exports=router