const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    instruction: {
        type: String
    },
    equipment: {
        type: String
    },
    Difficulty: {
        type: String
    },
    exercise_type: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ExerciseType"
    },
    muscle_groups: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MuscleGroup"
        }
    ],
    media: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Media"
        }
    ],
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model('Exercise', exerciseSchema);