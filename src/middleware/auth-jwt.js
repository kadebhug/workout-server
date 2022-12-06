const jwt = require("jsonwebtoken");
const db = require("../models");

const User = db.user;
const Role = db.role;
const secret = process.env.secret;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      return next();
    });
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