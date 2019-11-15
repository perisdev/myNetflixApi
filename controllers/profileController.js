
const profileController = (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(204).json(req.user);
  }
};

module.exports = profileController;
