const UserModel = require('../models/User');

const tokenTestMiddleware = (req, res, next) => {

  const token = req.headers.key;

  UserModel.findOne({ token: token }).then(item => {
    if (item) {
      req.user = item;
      next();
    } else {
      res.status(401).json({ message: "... invalid token ..." });
    }
  });
};

module.exports = tokenTestMiddleware