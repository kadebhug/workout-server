const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.role = require("./role.mongo");
db.user = require("./user.mongo");
db.workout = require("./workout.mongo");
db.exercise = require("./exercise.mongo");

db.ROLES = ["ADMIN", "TRAINER", "USER"];

module.exports = db;