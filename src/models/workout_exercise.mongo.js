const mongoose = require('mongoose');

const workoutExerciseSchema = new mongoose.Schema({
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
    distance:{
        type: Number
    },
}, { timestamps: true });

module.exports = mongoose.model('WorkoutExercise', workoutExerciseSchema);