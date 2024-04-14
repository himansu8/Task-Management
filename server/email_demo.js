
import nodemailer from "nodemailer";

import config from './config/config.js';
//console.log(config)
const { SMTP_HOST, SMTP_USER_EMAIL, SMTP_HOST_PASS } = config;
const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: SMTP_USER_EMAIL,
        pass: SMTP_HOST_PASS,
    },
});


// let userObj = {
//     to: "himansusekharsahu50@gmail.com",
//     subject: "Task Tracker Frontend",
//     text: "Need To Complete123456",
//     html: "<h1>Need To Complete aaaa</h2>"
// }
// sendMail(userObj);

// async..await is not allowed in global scope, must use a wrapper


async function sendMail(mailBody) {
    try {
        //console.log("jinu")
        const info = await transporter.sendMail({
            from: `"HIMANSU 👻" <${SMTP_USER_EMAIL}>`, // sender address
            to: mailBody.to, // list of receivers
            subject: mailBody.subject, // Subject line
            text: mailBody.text, // plain text body
            html: mailBody.html, // html body
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error)
        console.log("Email Not Send")

    }
}
export default sendMail;