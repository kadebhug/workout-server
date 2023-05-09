require("dotenv").config() // load .env variables
const mongoose = require("mongoose") //import fresh mongoose object
const { roleSeeds, userSeeds, muscleGroupSeeds, exerciseTypeSeeds, focusSeeds } = require('./seeds');
const { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } = process.env 

// CONNECT TO MONGO
mongoose.connect = mongoose.connect(`mongodb://localhost:27017/test`, {useNewUrlParser: true, useUnifiedTopology: true})
                    .then(() => {
                        roleSeeds();
                        userSeeds();
                        muscleGroupSeeds();
                        exerciseTypeSeeds();
                        focusSeeds();
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