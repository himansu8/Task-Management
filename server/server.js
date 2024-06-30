//const express = require('express')
import express from 'express'
import cors from 'cors'
import userRoute from './routes/user.route.js'
import taskRoute from './routes/task.route.js'
import './dbConnect.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3001;

app.use(cookieParser())

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', // Whitelisted origin
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow credentials (cookies, authorization headers)
};


  app.use(cors(corsOptions));
  //app.options('*', cors(corsOptions));

app.get('/',(req,res)=>{
    res.status(200).send("server started up fine")
})


app.use('/api/user',userRoute)
app.use('/api/task',taskRoute)




app.listen(port,()=>{
    console.log(`the server started at port no ${port}`)
})