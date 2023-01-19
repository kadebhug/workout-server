const db = require("../../models/index");
const mongoose = require("mongoose");
const Exercise = db.exercise;
const MuscleGroup = db.muscle_group;
const ExerciseType = db.exercise_type;

exports.getConstantData = async (req, res, next) => {
    console.log(req.params);
    try {
        const allExerciseTypes = await ExerciseType.find();
        const allMuscleGroups = await MuscleGroup.find();

        return res.send({ 
            message: "Successfully retrieved data",
            data: {
                exercise_types: allExerciseTypes,
                muscle_groups: allMuscleGroups
            }
        })
    } catch (error) {
        return res.status(500).send({ 
            message: "Error retrieving data"
        })
    }
}

exports.createExercise = async (req, res, next) => {
    try {
        if(req.body.media){
            // Save media to S3 and insert into Media table
        }
        if(req.body.personal_exercise){
            await Exercise.create({
                name: req.body.name,
                description: req.body.description,
                instruction: req.body.instruction,
                equipment: req.body.equipment,
                exercise_type: req.body.exercise_type,
                muscle_groups: req.body.muscle_groups,
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

//create a method that will return all exercises
exports.getAllExercises = async (req, res, next) => {
    try {
        let exercises = await Exercise.find();
        return res.send({ 
            message: "Successfully retrieved all exercises",
            data: exercises
        })
    } catch (error) {
        return res.status(500).send({ 
            message: "Error retrieving all exercises"
        })
    }
}

//create a method that will return all exercises by a specific user
exports.getAllExercisesByUser = async (req, res, next) => {
    try {
        let exercises = await Exercise.find({creator_id: req.userId});
        return res.send({ 
            message: "Successfully retrieved all exercises by user",
            data: exercises
        });
    } catch (error) {
        return res.status(500).send({ 
            message: "Error retrieving all exercises by user"
        });
    }
}