const mongoose=require('mongoose');

const db="mongodb+srv://mern:stack@cluster0.ponzj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(db,).then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log("no connection")
})