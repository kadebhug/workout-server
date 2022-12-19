const db = require("../../models/index");
const User = db.user;

exports.getAllUsersIncludingAdmin = async (req, res, next) => {
    try {
        const allUsers = await User
                            .find({})
                            .populate({
                                path: 'roles',
                                select: 'display code -_id'
                            });
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

exports.getAllUsersOnly = async (req, res, next) => {
    try {
        const allUsers = await User
                            .find({})
                            .populate({
                                path: 'roles',
                                select: 'display code -_id'
                            });
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
                            .find({
                                
                            })
                            .populate({
                                path: 'roles',
                                select: 'display code -_id'
                            });
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