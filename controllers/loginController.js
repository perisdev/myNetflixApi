const { generateId } = require('../tools');
const UserModel = require('../models/User');

const loginController = (req, res) => {
  
  const user = req.body;

  UserModel.findOne({ username: user.username })
    .then(async (item) => {

        if (!item)
          return res.status(400).json({ message: `... login failed ...` });
  
        // password
        const isMatch = await item.comparePassword(user.password)
  
        if (!isMatch)
          return res.status(400).json({ message: `... login failed ...` });
        // ....
  
        const token = generateId();
  
        UserModel.findByIdAndUpdate(item._id, { token: token }, { new: true, useFindAndModify: false })
          .then(user => res.status(200).json({ message: `... login successful ...`, token: user.token }))
          .catch(err => {
            res.status(500).json({ message: `Login() error: ${err}` });
          });
    });
};

module.exports = loginController;
