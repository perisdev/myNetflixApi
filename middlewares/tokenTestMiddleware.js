/**
 * Token authentication control
 * -------------------------------*/

 const UserModel = require('../models/User');

const tokenTestMiddleware = (req, res, next) => {

  const token = req.headers.key;

  UserModel.findOne({ token: token }).then(item => {
    if (item) {
      req.info = {
        "user": item,
        "order": req.body,
        "deliveryCity": req.query.city
      };

      next();
    } else {
      res.status(401).json({ message: "... invalid token ..." });
    }
  });
};

module.exports = tokenTestMiddleware