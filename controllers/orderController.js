/** 
 * POST - controls rent and return of movies.
 * 
 * GET - responds with a delivery date based on destination city
 * ---------------------------------------------------------------*/

const UserModel = require('../models/User');
const CityModel = require('../models/City');

const orderController = (req, res) => {

  let user = req.info.user;
  let order = req.info.order;

  if (!order.type)
    order.type = 'delivery';

  switch (order.type) {
    case 'rent':
      if (user.order.movieId)
        return res.status(400).json({ message: '... user already has a movie rented ...' });

      (async () => {
        UserModel.findByIdAndUpdate(user._id, {
          order: {
            movieId: order.movieId,
            dateRent: Date.now(),
            dateArrival: await getDateArrival(order.deliveryCity),
            daysRent: order.daysRent,
            price: order.price
          },
          $push: {
            orders: {
              movieId: order.movieId,
              dateRent: Date.now(),
              daysRent: order.daysRent,
              price: order.price
            }
          }
        }, { new: true, useFindAndModify: false })
          .then(() => res.status(200).json({ message: `... rent successful ...` }))
          .catch(err => {
            res.status(500).json({ message: `rent error: ${err}` });
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
        });

      break;

    case 'delivery':
      (async () => res.status(200).json({ dateArrival: await getDateArrival(req.info.deliveryCity) }))();
      break;

    default:
      res.status(404).json({ message: '... order type not found ...' });
      break;
  }
};

const getDateArrival = async (city) => {

  let dateArrival = new Date();
  let regexp = new RegExp(`\\b${city}\\b`, 'i');

  return await CityModel.findOne({ name: regexp })
    .then(item => {
      dateArrival.setDate(dateArrival.getDate() + ((item) ? item.deliverDays : 1));
      return dateArrival;
    })
    .catch(err => {
      return res.status(500).json({ message: `Date Arrival error: ${err}` });
    });
}

module.exports = orderController;
