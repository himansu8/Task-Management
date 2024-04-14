import jwt from 'jsonwebtoken';

import config from '../config/config.js';


const private_key= config.PRIVATE_KEY;
//const expiresIn= config.JWT_EXPIRY;


function generationToken (payload){
    const token = jwt.sign(payload, private_key)
    //const token = jwt.sign(payload, private_key,{expiresIn})

    //console.log("encoded---------------")
    //console.log(token)
    return token;
}  
export default generationToken;