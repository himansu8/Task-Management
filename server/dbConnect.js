import mongoose from "mongoose";
import config from "./config/config.js";


//console.log(process.env.MONGODB_URI)

const {MONGO_URL} = config

async function dbConnect() {

    try {
        await mongoose.connect(MONGO_URL);
        console.log("DB connected successfully");
    } catch (error) {
        console.log(error);

    }
}
dbConnect()