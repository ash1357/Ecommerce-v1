const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto =require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        maxlength:[30,"name cannot exceed 30 characters"],
        minlength:[4,"name should have more than 4 characters"],
    },
    email:{
        type:String,
        required:[true,"please enter your email"],
        unique:true,
        validate:[validator.isEmail,"please enter valid email"]
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        minlength:[8,"password should have more than 8 characters"],
        select:false,    
    },
    avatar:{ 
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            } 
    },
    role:{
        type:String,
        default:"user",
    },

    resetPasswordToken:String,
    resetPasswordToken: Date,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next(); 
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });

 
//JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
   return await  bcrypt.compare(enteredPassword,this.password);

}

//Generating password reset token

//Generating token

module.exports = mongoose.model("User",userSchema);