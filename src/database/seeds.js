const db = require("../models/index");
const Role = db.role;

const roleSeeds = () => {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                display: "User",
                code: "USER"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'User' to roles collection");
            });

            new Role({
                display: "Trainer",
                code:"TRAINER"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'Trainer' to roles collection");
            });

            new Role({
                display: "Admin",
                code:"ADMIN"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'Admin' to roles collection");
            });
        }
    });
}

module.exports = {
    roleSeeds
}