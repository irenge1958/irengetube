const express=require("express")
const morgan=require("morgan")
const helmet=require("helmet")
const dotenv=require("dotenv")
const authRoute=require("./route/auth")
const user=require("./route/user")
const video=require("./route/video")
const mongoose=require("mongoose")
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app=express()
dotenv.config()
mongoose.connect(process.env.code_db);
mongoose.connection.on('connected', () => {
     console.log('Successfully connected to the database');
 });
 app.use(cors({
     origin: ['https://irenge-socialfront-1eby.vercel.app', 'http://localhost:3000'], // Add your production and development domains
     methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed HTTP methods
     allowedHeaders: ['Content-Type', 'Authorization'],  // Specify allowed headers
   }));
   app.options("*", (req, res) => {
     res.set({
       "Access-Control-Allow-Origin": "https://irenge-socialfront-1eby.vercel.app",
       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
       "Access-Control-Allow-Headers": "Origin, Content-Type, Authorization",
       "Access-Control-Allow-Credentials": "true"
     });
     res.sendStatus(204);
   });
 app.use(cookieParser())
 app.use(express.json())
app.use('/auth/',authRoute)
app.use('/user/',user)
app.use('/videos/',video)
app.use((err,req,res,next)=>{
const status=err.status || 500
const message=err.message || 'Something Went Wrong'
return res.status(status).json({
     success:'failure',
     status:status,
     message:message
})
})
app.get('/', (req, res) => {
     res.status(200).send('API is working on Vercell!');
   });
app.listen(9000,()=>{
     console.log("The server runs on 9000")
})
