//const express = require('express')
import express from 'express'
import path from 'node:path'
import * as url from 'url';

const app = express();
const port = 3000;



const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


app.use('/', express.static(path.join(__dirname, 'build')))


app.listen(port,()=>{
    console.log(`the server started at port no ${port}`)
})