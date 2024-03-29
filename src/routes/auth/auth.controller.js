const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { comparePassword, passwordHash } = require('../../services/encryption');
const { sendMail } = require('../../services/mail');
const db = require("../../models/index");
const Role = db.role;
const User = db.user;

let secret = process.env.SECRET;

exports.register = async (req, res, next) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */
    let role = req.body.role;
    let user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        password: await passwordHash(req.body.password)
    });

    sendMail({
        fileName: 'register',
        emailTo: 'test@email.com', 
        subject: 'register',
        data: {
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.phone,
            email: user.email
        }
    })
    return res.status(200).send({ message: "Sent"});
    // user.save((err, user) => {
    //     if(err) {
    //         return res.status(500).send({message: err});
    //     }
    //     if(role) {
    //         Role.find({
    //             code: { $in: role },
    //         },
    //         (err, roles) => {
    //             if(err) {
    //                 return res.status(500).send({ message: err })
    //             }
    //             user.roles = roles.map((role) => role._id);
    //             user.save((err) => {
    //                 if(err) {
    //                     return res.status(500).send({ message: err })
    //                 }
    //                 return res.send({ message: `${roles.code} User was registered successfully!` });
    //             })
    //         })
    //     } else {
    //         Role.findOne({ code: "USER" }, (err, role) => {
    //             if(err){
    //                 return res.status(500).send({ message: err });
    //             }
    //             user.roles = [role._id];
    //             user.save((err) => {
    //                 if(err){
    //                     return res.status(500).send({ message: err });
    //                 }
    //                 return res.send({ message: "User was registered successfully!" })
    //             })
    //         })
    //     }
    // });
}

exports.login = async (req, res) => {
    User.findOne({
        email: req.body.email
    })
    .select('+password')
    .populate("roles", "-__v")
    .exec(async (err, user) => {
        if(err){
            return res.status(500).send({ message: err });
        }
        if(!user){
            return res.status(404).send({ message: "User not found" });
        }

        let passwordIsValid = await comparePassword(req.body.password, user.password);

        if(!passwordIsValid) {{
            return res.status(500).send({ message: "Wrong password"});
        }}
        
        let authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
            authorities.push(user.roles[i].code);
        }

        let token = jwt.sign({ id: user.id, role: authorities }, secret, {
            expiresIn: 86400
        })

        res.status(200).send({
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            roles: authorities,
            accessToken: token
        })
    })
}

exports.signout = async (req, res) => {
    try {
      return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
      this.next(err);
    }
  };