//const express = require('express')
import express from 'express'
import cors from 'cors'
import userRoute from './routes/user.route.js'
import taskRoute from './routes/task.route.js'
import './dbConnect.js';
import cookieParser from 'cookie-parser';
import path from 'node:path'
import * as url from 'url';

const app = express();
const port = 3001;

app.use(cookieParser())

app.use(express.json());
var whitelist = ['http://localhost:3000', 'http://43.204.100.160:3000', '*', 'http://0.0.0.0:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow credentials (cookies, authorization headers)
};


app.use(cors({
  origin: true,
  credentials: true
}));
// app.options('*', cors(corsOptions));

// app.get('/',(req,res)=>{
//     res.status(200).send("server started up fine")
// })


app.use('/api/user', userRoute)
app.use('/api/task', taskRoute)

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


// app.get('/*', express.static(path.join(__dirname, 'build')))


app.listen(port, () => {
  console.log(`the server started at port no ${port}`)
})

