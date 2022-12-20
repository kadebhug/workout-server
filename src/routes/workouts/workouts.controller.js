const db = require("../../models/index");
const mongoose = require("mongoose");
const Workout = db.workout;

exports.createWorkout = async (req, res, next) => {
    try {
        await Workout.create({
            name: req.body.name,
            name: req.body?.description,
            name: req.body?.instruction,
            name: req.body?.muscle_group,
            name: req.body?.equipment,
            creator_id: req.userId
        }, (err, workout) => {
            if(err) return res.status(500).send({ 
                message: "Error creating a workout"
            })

            return res.send({ 
                message: "Successfully created a workout",
            })
        });
    } catch (error) {
        return res.status(500).send({ 
            message: "Error creating a workout"
        })
    }
}

exports.viewWorkout = async (req, res, next) => {
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

exports.deleteWorkout = async (req, res, next) => {
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