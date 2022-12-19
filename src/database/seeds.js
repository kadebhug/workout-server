const db = require("../models/index");
const { passwordHash } = require('../services/encryption');
const { ALL_ROLES } = require("../constants/roles");
const { USERS } = require("../constants/users");
const Role = db.role;
const User = db.user;

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

module.exports = {
    roleSeeds,
    userSeeds
}