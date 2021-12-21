const app = require('./app');

const dotenv = require('dotenv')
require("./config/databases");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

//config
dotenv.config({path:'backend/config/config.env'})

// connectDatabase();

// const server=
app.listen(process.env.PORT,()=>{
    console.log(`server is working on https://localhost:${process.env.PORT}`)
})

// //Unhandled promise rejections
// process.on("unhandledRejection",(err)=>{
//     console.log(`Error:${err.message}`);
//     console.log(`Shutting down the server due to unhandle promise rejection`);

//     Server.close(()=>{
//         process.exit(1);
//     })
// })