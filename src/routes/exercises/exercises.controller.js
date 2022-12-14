const db = require("../../models/index");
const mongoose = require("mongoose");
const Exercise = db.exercise;

exports.createExercise = async (req, res, next) => {
    try {
        if(req.body.personal_exercise){
            await Exercise.create({
                name: req.body.name,
                creator_id: req.userId
            }, (err, workout) => {
                if(err) return res.status(500).send({ 
                    message: "Error creating a personal exercise"
                })
    
                return res.send({ 
                    message: "Successfully created a personal exercise",
                })
            });
        }else{
            await Exercise.create({
                name: req.body.name
            }, (err, workout) => {
                if(err) return res.status(500).send({ 
                    message: "Error creating an exercise"
                })
    
                return res.send({ 
                    message: "Successfully created an exercise",
                })
            });
        }
    } catch (error) {
        return res.status(500).send({ 
            message: "Error creating an exercise"
        })
    }
}

exports.viewExercise = async (req, res, next) => {
    console.log(req.params);
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).send({ 
                message: `Workout with id: ${req.params.id} not found`
            })
        }

        let workout = await Workout.findById(req.params.id);
        return res.send({ 
            message: "Successfully retrieved a workout",
            data: workout
        })
    } catch (error) {
        return res.status(500).send({ 
            message: "Error retrieving a workout"
        })
    }
}

exports.deleteExercise = async (req, res, next) => {
    console.log(req.params.id);
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).send({ 
                message: `Workout with id: ${req.params.id} not found`
            })
        }

        let workout = await Workout.findByIdAndDelete(req.params.id);
        return res.send({ 
            message: "Successfully deleted workout",
            data: workout
        })
    } catch (error) {
        return res.status(500).send({ 
            message: "Error deleting workout"
        })
    }
}