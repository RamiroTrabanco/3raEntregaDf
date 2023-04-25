import mongoose, { Mongoose } from "mongoose";

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        default: 0
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user' },
    /* cart: {
        type: mongoose.SchemaTypes.ObjectId, ref:"carts",
        default: 0
    } */}
)

export const userModel = mongoose.model("Users", usersSchema)