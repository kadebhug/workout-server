const db = require("../../models/index");
const User = db.user;

exports.getAllUsers = async (req, res, next) => {
    try {
        console.log("REQ: ", req.role);
        const allUsers = await User
        .find({}, {
            roles: {
                "$elemMatch":{
                    "code": "ADMIN"
                }
            }
        })
                            // .populate({
                            //     path: 'roles',
                            //     select: 'display code -_id'
                            // });
        return res.send({ 
            message: "Successfully got all users",
            data: allUsers
        })
    } catch (error) {
        return res.status(500).send({ 
            message: "Error getting all users"
        })
    }
}

exports.getSingleUser = async (req, res, next) => {
    try {
        const singleUser = await User
                            .findOne({_id: req.params.id})
                            .populate({
                                path: 'roles',
                                select: 'display code -_id'
                            });
        return res.send({ 
            message: "Successfully got user",
            data: singleUser
        })
    } catch (error) {
        return res.status(500).send({ 
            message: "Error getting all users"
        })
    }
}