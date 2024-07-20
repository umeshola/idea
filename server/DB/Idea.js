import mongoose from 'mongoose'
const ideaSchema = new mongoose.Schema({
    by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    like: { type: Number, default: 0 },
    worker: { type: Number, default: 0 },
    fund: { type: Number, default: 0 }
})

mongoose.model("Idea", ideaSchema)