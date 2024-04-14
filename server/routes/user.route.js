import express from 'express';
import {signup, login, verifyEmail, verifyPhone, logoutToken} from '../controller/user.controller.js'
import {loginValidation,validationErrors,signupValidation} from '../middlewares/validation/index.js'

const router = express.Router();

// router.get('/',(req,res)=>{
//     res.status(200).send('user root route')
// })

router.post('/signup', signupValidation(),validationErrors, signup);

router.post('/login',loginValidation(),validationErrors, login);


router.get('/verify/email/:token', verifyEmail);

router.get('/verify/phone/:token', verifyPhone);


router.get("/removetoken", logoutToken);


export default router; 