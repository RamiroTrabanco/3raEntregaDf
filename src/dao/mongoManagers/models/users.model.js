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
        default: 'user' },
    cartId: {
        type: mongoose.SchemaTypes.ObjectId, ref:"carts"
    }}
)

export const userModel = mongoose.model("Users", usersSchema)