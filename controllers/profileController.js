
const profileController = (req, res) => {
  res.status(200).json(req.info.user);
};

module.exports = profileController;
