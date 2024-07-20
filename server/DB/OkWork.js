import mongoose from 'mongoose'
const okWorkSchema = new mongoose.Schema({
    on: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Idea"
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
})

mongoose.model("OkWork", okWorkSchema)