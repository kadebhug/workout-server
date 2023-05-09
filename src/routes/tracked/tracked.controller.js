const db = require("../../models/index");
const mongoose = require("mongoose");
const Workout = db.workout;
const WorkoutExercise = db.workout_exercise;
const Tracked = db.tracked;
const User = db.user;

exports.addTrackedData = async (req, res, next) => {
    try {
        let user_names = await User.find({
            first_name: {$regex: user}})
            .select("first_name")
            .lean();
            
        let workoutExercises = await WorkoutExercise.findById(workout_exercise_id)
            

        return res.send({ 
            message: "Successfully added tracked data"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ 
            message: "Error adding tracked data"
        })
    }
}