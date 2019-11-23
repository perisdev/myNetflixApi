const registerController = (req, res) => {
  const user = req.body;

  const longitudPattern = /.{8,}/

  if (!longitudPattern.test(user.password)) {
    return res
      .status(400)
      .json({ message: `password too short` });
  }

  const digitCharacters = /\d/;

  if (!digitCharacters.test(user.password)) {
    return res
      .status(400)
      .json({ message: `password must have a digit` });
  }
  const capitalCharacters = /[A-Z]/;

  if (!capitalCharacters.test(user.password)) {
    return res
      .status(400)
      .json({ message: `password must have a capitalCase` });
  }
  const expecialCharacters = /[!|@#$%¬/()\[\]\+\*\{\}]/;

  if (!expecialCharacters.test(user.password)) {
    return res
      .status(400)
      .json({ message: `password must have a special character` });
  }

  const UserModel = require('../models/User');

  UserModel.findOne({ username: user.username })
    .then(item => {
      // user already exists
      if (item) {
        res.status(401).json({ message: `user ${user.username}, already exists..` });

        // register new user
      } else {
        try {
          new UserModel({
            username: user.username,
            password: user.password,
            email: user.email
          }).save();

          res.status(200).json({ message: `${user.username} has been successfully registered` });
        } catch (err) {
          res.status(500).json({ message: `save() error: ${err}` });
        }
      }
    });
};

module.exports = registerController;