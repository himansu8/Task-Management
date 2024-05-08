import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
//import generationToken from '../utils/generationToken.js';
import userModel from '../models/userModel.js';
import sendMail from '../email_demo.js';
import config from '../config/config.js';
import jwt from "jsonwebtoken"


export const signup = async (req, res) => {
    try {
        let { firstName, lastName, email, phone, password } = req.body


        // duplicate the email and phone
        //let emailFound = fileData.find((ele) => ele.email == email);
        let emailFound = await userModel.findOne({ email: email });
        if (emailFound) {
            return res.status(409).json({ error: 'user email already registered' })
        }

        let phoneFound = await userModel.findOne({ phone: phone });
        if (phoneFound) {
            return res.status(409).json({ error: 'user phone already registered' })
        }


        // hassing the password
        password = await bcrypt.hash(password, 12)

        let userverifyToken = {
            email: uuidv4(),
            phone: uuidv4(),
        }

        let userData = {

            firstName,
            lastName,
            email,
            phone,
            password,
            userverifyToken

        }
        await userModel.create(userData);



        res.status(200).json({ msg: 'user signup sucessfull' });
        let usermailBody = {
            to: email,
            subject: "Email Verification For Himansu Task Tracker",
            //text: `Please Verify Your Email ${config.BASE_URL}/api/user/verify/email/${userverifyToken.email}`,
            html: `<p>Hi, <b>${userData.firstName}</b></p>
            Thank you for signing up. Please <a href="${config.BASE_URL}/api/user/verify/email/${userverifyToken.email}">click here</a>
            on this link to verify your email.
            <p> Thank you for choosing Himansu Task Tracker </p>`
        }
        sendMail(usermailBody)

        // do SMS same as email

    } catch (error) {
        res.status(500).json({ error: 'something went wrong' });
    }

}

export const login = async (req, res) => {
    try {
        var { email, password } = req.body;

        // duplicate the email and phone
        let emailFound = await userModel.findOne({ email: email });
        if (!emailFound) {
            return res.status(401).json({ error: 'Incorrect email id' })
        }
        let matchPassword = await bcrypt.compare(password, emailFound.password);
        if (!matchPassword) {
            return res.status(401).json({ error: 'Incorrect password' })
        }


        if (emailFound.isVerified.email == false) {
            return res.status(401).json({ error: "Email is not verified" })
        }

        // if (emailFound.isVerified.phone == false) {
        //     return res.status(401).json({ error: "Phone is not verified" })
        // }


        //generation token
        // let payload = {
        //     user_id: emailFound._id
        // }
        // const token = generationToken(payload)

        // res.status(200).json({ msg: 'user login successfully', token });
        const token = jwt.sign(
            { user_id: emailFound._id },
            config.PRIVATE_KEY
        );
        console.log(token)
        var { password, ...otherDetails } = emailFound._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: 'none'
        }).status(200).json({ details: { ...otherDetails } });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'something went wrong' });
    }
}


export const verifyEmail = async (req, res) => {
    try {

        let { token } = req.params;

        let userFound = await userModel.findOne({ "userverifyToken.email": token })
        if (!userFound) {
            return res.status(404).json({ error: "User not found" })
        }

        if (userFound.isVerified.email == true) {
            return res.status(404).json({ error: "user already verified" })
        }

        userFound.isVerified.email = true;
        await userFound.save();

        res.status(200).send("Email Verified");

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'something went wrong' });
    }
}


export const verifyPhone = async (req, res) => {
    try {
        let { token } = req.params;

        let userFound = await userModel.findOne({ "userverifyToken.email": token })
        if (!userFound) {
            return res.status(404).json({ error: "User not found" })
        }

        if (userFound.isVerified.phone == true) {
            return res.status(404).json({ error: "user already verified" })
        }

        userFound.isVerified.phone = true;
        await userFound.save();

        res.status(200).send("Phone Verified");


    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'something went wrong' });
    }
}

export const logoutToken = async (req, res, next) => {
    try{
      res.clearCookie('access_token'); 
      res.status(201).send('Token removed successfully')
    }
    catch(error){
      next(error)
    }
    }
