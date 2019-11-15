
const fs = require("fs");

const authorizationMiddleware = (req, res, next) => {

const token = req.headers.authorization;

const db = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

const foundUser = db.users.find(existentUser => existentUser.token === token);

if (foundUser) {
    req.user = foundUser;
    next();
} else {
  res.status(401).json({ message: "Invalid token" });
}

};




module.exports = authorizationMiddleware