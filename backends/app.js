
const express = require('express')
const dotenv = require('dotenv')
const path =require('path');

const app = express() 
const cors =require('cors')

const uploadRoutes =require('./router/uploadRoute')

dotenv.config({ path: "./config.env" })
require('./DB/moongose')
app.use(express.json())
const PORT = process.env.PORT;
app.use(cors())
// console.log(__dirname)
// const testPath = path.join(__dirname,'/uploads')
// console.log(testPath)
// app.use('/uploads', express.static( path.join(__dirname,'/uploads')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/upload', uploadRoutes)


app.use(require("./router/auth"))
app.use(require("./router/User"))
app.use(require("./router/Admin"))
app.use(require("./router/Order"))
app.use(require('./router/Razorpay'));
app.use(require('./router/Paymentstripe'));

// require('./DB/moongose')
// app.use(express.json()) 




app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))