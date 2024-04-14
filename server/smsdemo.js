import twilio from 'twilio';

import config from './config/config.js';



const accountSid = config.TWILIO_SID;
const authToken = config.TWILIO_TOKEN;
const twilioNumber = config.TWILIO_NUMBER;

const client = new twilio(accountSid, authToken)

//const{TWILIO_SID,TWILIO_TOKEN,TWILIO_NUMBER} =  config

async function sendSMS(smsBody) {
    try {
        let message = await client.messages
            .create({
                body: smsBody.body,
                from: twilioNumber,
                to: smsBody.to
            })
        console.log(message.id);
    } catch (error) {
        console.log(error)
        
    }
}  
export default sendSMS;