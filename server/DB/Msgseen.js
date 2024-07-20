import mongoose from 'mongoose'
const msgseenSchema = new mongoose.Schema({
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

mongoose.model("Msgseen", msgseenSchema)