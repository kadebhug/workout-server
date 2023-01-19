require("dotenv").config() // load .env variables
const mongoose = require("mongoose") //import fresh mongoose object
const { roleSeeds, userSeeds, muscleGroupSeeds, exerciseTypeSeeds } = require('./seeds');
const { DATABASE_URL } = process.env 

// CONNECT TO MONGO
mongoose.connect = mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
                    .then(() => {
                        roleSeeds();
                        userSeeds();
                        muscleGroupSeeds();
                        exerciseTypeSeeds();
                        console.log("YAY");
                    })
                    .catch(error => {
                        console.error('AWW: ', error)
                        process.exit();
                    })

// CONNECTION EVENTS
mongoose.connection
.on("open", () => console.log("DATABASE STATE: ", "Connection Open"))
.on("close", () => console.log("DATABASE STATE: ", "Connection Closed"))
.on("error", (error) => console.log("DATABASE STATE: ", error))

// EXPORT CONNECTION
module.exports = mongoose