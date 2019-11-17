const UserModel = require('../models/User');
const CityModel = require('../models/City');

const orderController = (req, res) => {

  let user = req.info.user;
  let order = req.info.order;

  switch (order.type) {
    case 'rent':
      if (user.order.movieId)
        return res.status(400).json({ message: '... user already has a movie rented ...' });

      (async () => {
        let dateArrival = new Date();
        let deliverDays = null;
        let regexp = new RegExp(`\\b${order.deliveryCity}\\b`, 'i');

        await CityModel.findOne({ name: regexp })
          .then(item => deliverDays = (item) ? item.deliverDays : 1);

        dateArrival.setDate(dateArrival.getDate() + deliverDays);

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

      })();
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
