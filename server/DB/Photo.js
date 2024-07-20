import mongoose from 'mongoose'
const photoSchema = new mongoose.Schema({
    on: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Idea"
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    link: { type: String, }
})

mongoose.model("Photo", photoSchema)