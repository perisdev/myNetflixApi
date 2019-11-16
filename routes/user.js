const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const logoutController = require("../controllers/logoutController");
const profileController = require("../controllers/profileController");

// const logMiddleware = require('../middlewares/logMiddleware');
const tokenTestMiddleware = require("../middlewares/tokenTestMiddleware");

let express = require('express');
let router = express.Router();

// router.use(logMiddleware);

router.get("/profile", tokenTestMiddleware, profileController);
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", tokenTestMiddleware, logoutController);

router.use((req, res) => {
  res.status(404).json({ message: '... not found error ...' })
})

module.exports = router;
