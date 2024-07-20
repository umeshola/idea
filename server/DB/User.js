import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: Number, default: 100 }
})

mongoose.model("User", userSchema)