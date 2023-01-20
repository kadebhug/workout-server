const db = require("../../models/index");
const mongoose = require("mongoose");
const Exercise = db.exercise;
const User = db.user;
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
        if (req.body.media) {
            // Save media to S3 and insert into Media table
        }
        await Exercise.create({
            name: req.body.name,
            description: req.body.description,
            instruction: req.body.instruction,
            equipment: req.body.equipment,
            exercise_type: req.body.exercise_type,
            muscle_groups: req.body.muscle_groups,
            creator_id: req.userId
        }, (err, workout) => {
            if (err) return res.status(500).send({
                message: "Error creating a personal exercise"
            })

            return res.send({
                message: "Successfully created a personal exercise",
            })
        });
    } catch (error) {
        return res.status(500).send({
            message: "Error creating an exercise"
        })
    }
}

exports.viewExercise = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).send({
                message: `Exercise with id: ${req.params.id} not found`
            })
        }

        let exercise = await Exercise.findById(req.params.id)
            .populate("exercise_type", "-__v")
            .populate("muscle_groups", "-__v");

        return res.send({
            message: "Successfully retrieved a exercise",
            data: exercise
        })
    } catch (error) {
        return res.status(500).send({
            message: "Error retrieving a exercise"
        })
    }
}

exports.updateExercise = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).send({
                message: `Exercise with id: ${req.params.id} not found`
            })
        }
        let exercise = await Exercise.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            instruction: req.body.instruction,
            equipment: req.body.equipment,
            exercise_type: req.body.exercise_type,
            muscle_groups: req.body.muscle_groups,
            // creator_id: req.userId,
            // media: req.body.media
        }, { new: true })
            .populate("exercise_type", "-__v")
            .populate("muscle_groups", "-__v");

        return res.send({
            message: "Successfully updated a exercise",
            data: exercise
        })

    } catch (error) {
        return res.status(500).send({
            message: "Error updating a exercise"
        })
    }
}


exports.deleteExercise = async (req, res, next) => {
    console.log(req.params.id);
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).send({
                message: `Exercise with id: ${req.params.id} not found`
            })
        }

        let exercise = await Exercise.findByIdAndDelete(req.params.id);
        return res.send({
            message: "Successfully deleted exercise",
            data: exercise
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error deleting exercise"
        })
    }
}

exports.getAllExercises = async (req, res, next) => {
    const limit = 10;
    const page = req?.query?.page ?? 0;
    const search = req?.query?.search ?? '';
    const user = req?.query?.user ?? '';

    try {
        let user_names = await User.find({
            first_name: {$regex: user}})
            .select("first_name")
            .lean();
        
        let exercises = await Exercise.find({
                $or: [
                    { name: { $regex: search } },
                    { description: { $regex: search } },
                ],
                $and: [
                    { creator_id: { $in: user_names } },
                ]
            })
            .sort({ name: "asc" })
            .limit(limit)
            .skip(limit * page)
            .populate("creator_id", "-__v")


        return res.send({
            message: "Successfully retrieved all exercises",
            data: exercises,
            page: page,
            limit: limit
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error retrieving all exercises"
        })
    }
}