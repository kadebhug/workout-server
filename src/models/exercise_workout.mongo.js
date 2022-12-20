const mongoose = require('mongoose');

const exerciseWorkoutSchema = new mongoose.Schema({
    exercise_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise"
    },
    workout_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout"
    },
    sets:{
        type: Number
    },
    reps:{
        type: Number
    },
    duration:{
        type: Number
    },
}, { timestamps: true });

module.exports = mongoose.model('ExerciseWorkout', exerciseWorkoutSchema);