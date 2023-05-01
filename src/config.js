import dotenv from "dotenv"
dotenv.config();

export default {
    PORT: process.env.PORT,
    MONGOURL: process.env.MONGOURL,
    PERSISTENCE: process.env.PERSISTENCE,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
}