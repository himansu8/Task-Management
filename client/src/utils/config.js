const config = {
    MONGO_URL : process.env.MONGODB_URI,
    TWILIO_SID : process.env.TWILIO_SID,
    TWILIO_TOKEN :process.env.TWILIO_TOKEN,
    TWILIO_NUMBER :process.env.TWILIO_NUMBER,
    SMTP_HOST : process.env.SMTP_HOST,
    SMTP_USER_EMAIL : process.env.SMTP_USER_EMAIL,
    SMTP_HOST_PASS : process.env.SMTP_HOST_PASS,
    PRIVATE_KEY : process.env.PRIVATE_KEY,
    JWT_EXPIRY : process.env.JWT_EXPIRY,
    BASE_URL : process.env.BASE_URL
}

export default config;