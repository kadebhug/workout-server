const db = require("../../models/index");
const mongoose = require("mongoose");
const Workout = db.workout;
const WorkoutExercise = db.workout_exercise;
const User = db.user;

exports.getAllWorkouts = async (req, res, next) => {
    const limit = 10;
    const page = req?.query?.page ?? 0;
    const search = req?.query?.search ?? '';
    const user = req?.query?.user ?? '';

    try {
        let user_names = await User.find({
            first_name: {$regex: user}})
            .select("first_name")
            .lean();

        let workouts = await Workout.find({
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
            .populate("creator_id", "-__v");
            

        return res.send({ 
            message: "Successfully retrieved all workouts",
            data: workouts
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ 
            message: "Error retrieving all workouts"
        })
    }
}

exports.createWorkout = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const workout = await Workout.create([{
            name: req.body.name,
            description: req.body?.description,
            type: req.body?.type,
            muscle_group: req.body?.muscle_group,
            difficulty: req.body?.difficulty,
            is_public: req.body?.is_public,
            creator_id: req.userId
        }], { session });

        for(let i = 0; i < req.body.exercises.length; i++) {
            await WorkoutExercise.create([{
                workout_id: workout[0]._id,
                exercise_id: req.body.exercises[i].exercise_id,
                sets: req.body.exercises[i].sets,
                reps: req.body.exercises[i].reps,
                duration: req.body.exercises[i].duration,
                distance: req.body.exercises[i].distance,
            }], { session });
        }

        await session.commitTransaction();
        await session.endSession();
        
        return res.send({ 
            message: "Successfully created a workout",
        })
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
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
        // TODO: change the workout model to include the exercises
        let workout = await Workout.findById(req.params.id);
        let workoutExercises = await WorkoutExercise.find().where('workout_id').equals(req.params.id);
        workout["exercises"] = workoutExercises;
        let newWorkout = workout.toObject();
        newWorkout.exercises = workoutExercises;

        return res.send({ 
            message: "Successfully retrieved a workout",
            data: newWorkout
        })
    } catch (error) {
        return res.status(500).send({ 
            message: "Error retrieving a workout"
        })
    }
}

exports.updateWorkout = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        console.log(req.body);
        const workout = await Workout.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body?.description,
            type: req.body?.type,
            muscle_group: req.body?.muscle_group,
            difficulty: req.body?.difficulty,
            is_public: req.body?.is_public
        }, { session });

        // Find and effective way to update the workout exercises
        await WorkoutExercise.deleteMany({ workout_id: req.params.id })

        for(let i = 0; i < req.body.exercises.length; i++) {
            await WorkoutExercise.create([{
                workout_id: req.params.id, 
                exercise_id: req.body.exercises[i].exercise_id,
                sets: req.body.exercises[i].sets,
                reps: req.body.exercises[i].reps,
                duration: req.body.exercises[i].duration,
                distance: req.body.exercises[i].distance,
            }], { session });
        }

        await session.commitTransaction();
        await session.endSession();
        
        return res.send({ 
            message: "Successfully updated workout",
        })
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        await session.endSession();
        return res.status(500).send({ 
            message: "Error updating workout"
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
        await WorkoutExercise.deleteMany({ workout_id: req.params.id });
        await Workout.findByIdAndDelete(req.params.id);
        return res.send({ 
            message: "Successfully deleted workout"
        })
    } catch (error) {
        return res.status(500).send({
            message: "Error deleting workout"
        })
    }
}