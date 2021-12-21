const express = require('express');
const app=express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser())

//Route Imports
const product = require('./route/productRoute');
const user = require('./route/userRoute');

app.use('/api/v1',product);
app.use('/api/v1',user);

//Middlwware for imports
app.use(errorMiddleware);

module.exports=app;