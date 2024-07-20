import mongoose from 'mongoose'
const likeSchema = new mongoose.Schema({
    on: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Idea"
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
})

mongoose.model("Like", likeSchema)