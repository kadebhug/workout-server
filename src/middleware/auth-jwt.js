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
      req.role = decoded.role[0];
      if (roles_allowed.length && !roles_allowed.includes(decoded.role[0])) {
        // user's role is not authorized
        console.log("NOT ALOOWED");
        return res.status(401).send({ message: 'Unauthorized' });
      }
      return next();
    });
  }
};

module.exports = {
  verifyToken
}