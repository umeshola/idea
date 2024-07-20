import mongoose from 'mongoose'
const msgSchema = new mongoose.Schema({
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    time: {
        type: Date,
    },
    msg: {
        type: String,
        required: true
    }
})

mongoose.model("Message", msgSchema)