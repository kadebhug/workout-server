const jwt = require("jsonwebtoken");
const db = require("../models");

const User = db.user;
const Role = db.role;
const secret = process.env.secret;

verifyToken = (roles_allowed) => {
  return (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: "Unauthorized!" });
      }
      console.log("DECODED: ", decoded);
      console.log("ALLOWED ROLES: ", roles_allowed);
      req.userId = decoded.id;
      if (roles_allowed.length && !roles_allowed.includes(decoded.role[0])) {
        // user's role is not authorized
        console.log("NOT ALOOWED");
        return res.status(401).send({ message: 'Unauthorized' });
      }
      return next();
    });
  }
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    Role.find(
      {
        _id: { $in: user.roles[0] }
      },
      (err, roles) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].code === "ADMIN") {
            return next();
          }
        }
        return res.status(403).send({ message: "Require Admin Role!" });
      }  
    );
  });
};

isTrainer = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].code === "TRAINER") {
            return next();
          }
        }
        return res.status(403).send({ message: "Require Trainer Role!" });
      }
    );
  });
};

module.exports = {
  verifyToken,
  isAdmin,
  isTrainer
}