const { generateId } = require('../tools');

const loginController = (req, res) => {
  const user = req.body;

  const UserModel = require('../models/User');

  UserModel.findOne({ username: user.username, password: user.password })
    .then(item => {
      // login OK
      if (item) {
        const token = generateId();

        UserModel.findByIdAndUpdate(item._id , {
          token: token                   
        }, {new:true, useFindAndModify:false})
        .then(user => res.status(200).json({ message: `... login successful ...`, token: user.token}))
        .catch(err => {
          res.status(500).json({ message: `Login() error: ${err}`});
        });          
        
      // login KO
      } else {
        res.status(400).json({ message: `... login failed ...` });
      }
    });
};

module.exports = loginController;
