const UserModel = require('../models/User');

const orderController = (req, res) => {

  let user = req.info.user;
  let order = req.info.order;

  switch (order.type) {
    case 'rent':
      if (user.order.movieId)
        return res.status(400).json({ message: '... user already has a movie rented ...' });

      let dateArrival = new Date();
      dateArrival.setDate(dateArrival.getDate() + order.deliverDays);

      UserModel.findByIdAndUpdate(user._id, {
        order: {
          movieId: order.movieId,
          dateRent: Date.now(),
          dateArrival: dateArrival
        },
        $push: {
          orders: {
            movieId: order.movieId,
            dateRent: Date.now()
          }
        }
      }, { new: true, useFindAndModify: false })
        .then(() => res.status(200).json({ message: `... rent successful ...` }))
        .catch(err => {
          res.status(500).json({ message: `rent error: ${err}` });
          console.log(err)
        });
      break;
    case 'return':
      if (user.order.movieId !== order.movieId)
        return res.status(400).json({ message: '... It is not a movie pending to be returned ...' });

      UserModel.findById(user._id)
        .then(item => {
          item.order = undefined;
          item.save();
          res.status(200).json({ message: `... return successful ...` })
        })
        .catch(err => {
          res.status(500).json({ message: `return error: ${err}` });
          console.log('return error:', err);
        });
      break;
    default:
      res.status(404).json({ message: '... order type not found ...' });
      break;
  }
};

module.exports = orderController;
