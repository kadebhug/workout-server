const mongoose = require("mongoose");

const trackedSchema = new mongoose.Schema({
    workout_exercise_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WorkoutExercise"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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
});

module.exports = mongoose.model("Tracked", trackedSchema);