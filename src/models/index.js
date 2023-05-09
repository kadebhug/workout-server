const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.role = require("./role.mongo");
db.user = require("./user.mongo");
db.workout = require("./workout.mongo");
db.exercise = require("./exercise.mongo");
db.workout_exercise = require("./workout_exercise.mongo");
db.exercise_type = require("./exercise_type.mongo");
db.muscle_group = require("./muscle_group.mongo");
db.subscription = require("./subscription.mongo");
db.tracked = require("./tracked.mongo");
db.media = require("./media.mongo");
db.focus = require("./focus.mongo");

db.ROLES = ["ADMIN", "TRAINER", "USER"];

module.exports = db;