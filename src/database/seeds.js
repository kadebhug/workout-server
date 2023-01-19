const db = require("../models/index");
const { passwordHash } = require('../services/encryption');
const { ALL_ROLES, USERS, MUSCLE_GROUPS, EXERCISE_TYPES } = require('../constants/index');
const Role = db.role;
const User = db.user;
const MuscleGroup = db.muscle_group;
const ExerciseType = db.exercise_type;

const roleSeeds = () => {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            for (let index = 0; index < ALL_ROLES.length; index++) {
                const role = ALL_ROLES[index];
                new Role({
                    display: role.display,
                    code: role.code
                }).save(err => {
                    if (err) {
                        console.log("error", err);
                    }
    
                    console.log(`added ${role.code} to roles collection`);
                });
            }
        }
    });
}
const userSeeds = () => {
    User.estimatedDocumentCount(async (err, count) => {
        if(!err && count === 0) {
            for (let index = 0; index < USERS.length; index++) {
                const seed_user = USERS[index];
                
                let user = new User({
                    first_name: seed_user.first_name,
                    last_name: seed_user.last_name,
                    phone: seed_user.phone,
                    email: seed_user.email,
                    password: await passwordHash(seed_user.password)
                });
            
                user.save((err, user) => {
                    if(err) {
                        return res.status(500).send({message: err});
                    }
                    if(seed_user.role) {
                        Role.find({
                            code: { $in: seed_user.role },
                        },
                        (err, roles) => {
                            if(err) {
                                console.log(`Error seeding user`);
                            }
                            user.roles = roles.map((role) => role._id);
                            user.save((err) => {
                                if(err) {
                                    console.log(`Error seeding user`);
                                }
                                console.log(`${seed_user.role} was registered`);
                            })
                        })
                    } else {
                        Role.findOne({ code: "USER" }, (err, role) => {
                            if(err){
                                console.log(`Error seeding user`);;
                            }
                            user.roles = [role._id];
                            user.save((err) => {
                                if(err){
                                    console.log(`Error seeding user`);;
                                }
                                console.log(`User was registered`);
                            })
                        })
                    }
                });
            }
        }
    })
}
const muscleGroupSeeds = () => {
    MuscleGroup.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            for (let index = 0; index < MUSCLE_GROUPS.length; index++) {
                const muscle_group = MUSCLE_GROUPS[index];
                new MuscleGroup({
                    display: muscle_group.display,
                    code: muscle_group.code
                }).save(err => {
                    if (err) {
                        console.log("error", err);
                    }
    
                    console.log(`added ${muscle_group.code} to MuscleGroup collection`);
                });
            }
        }
    });
}
const exerciseTypeSeeds = () => {
    ExerciseType.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            for (let index = 0; index < EXERCISE_TYPES.length; index++) {
                const exercise_type = EXERCISE_TYPES[index];
                new ExerciseType({
                    display: exercise_type.display,
                    code: exercise_type.code
                }).save(err => {
                    if (err) {
                        console.log("error", err);
                    }
    
                    console.log(`added ${exercise_type.code} to ExerciseType collection`);
                });
            }
        }
    });
}

module.exports = {
    roleSeeds,
    userSeeds,
    muscleGroupSeeds,
    exerciseTypeSeeds
}