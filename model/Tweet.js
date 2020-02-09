import mongoose from "mongoose"

const Tweet = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true,
        min: 1
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Tweet", Tweet)