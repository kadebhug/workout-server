const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    type: {
        type: String
    },
    difficulty: {
        type: String
    },
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);