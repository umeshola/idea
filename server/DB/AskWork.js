import mongoose from 'mongoose'
const askworkSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    on: { type: mongoose.Schema.Types.ObjectId, ref: "Idea" },
    msg: { type: String },
})

mongoose.model("AskWork", askworkSchema)