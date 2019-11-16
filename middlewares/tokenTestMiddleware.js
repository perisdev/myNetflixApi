const UserModel = require('../models/User');

const tokenTestMiddleware = (req, res, next) => {

  const token = req.headers.key;

  UserModel.findOne({ token: token }).then(item => {
    if (item) {
      req.info = {
        "user": item,
        "order": req.body
      };
      // req.info = [item, req.body];  // 0. user  1. order
      next();
    } else {
      res.status(401).json({ message: "... invalid token ..." });
    }
  });
};

module.exports = tokenTestMiddleware