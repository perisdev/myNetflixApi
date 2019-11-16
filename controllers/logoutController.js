const UserModel = require('../models/User');

const logoutController = (req, res) => {

  UserModel.findById(req.user._id)
    .then(item => {
      item.token = undefined;
      item.save();
      res.status(200).json({ message: `... valid logout ...` })
    })
    .catch(err => {
      res.status(500).json({ message: `logout error: ${err}` });
      console.log('logout error:', err);
    });
}

module.exports = logoutController;
