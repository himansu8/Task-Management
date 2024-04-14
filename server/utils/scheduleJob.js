
import sendMail from "../email_demo.js";
// //import sendSMS from "../smsdemo.js";



export default function reminderScheduling(userMailBody){
    //console.log('sending a email notification');
    // console.log('sending a sms notification'); 
    sendMail(userMailBody);
    // sendSMS();  
}