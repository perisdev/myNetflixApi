const express = require('express');
const router = express.Router();

// controllers
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const logoutController = require("../controllers/logoutController");
const profileController = require("../controllers/profileController");

// middlewares
const tokenTestMiddleware = require("../middlewares/tokenTestMiddleware");
// const logMiddleware = require('../middlewares/logMiddleware');
// router.use(logMiddleware);

// routes
router.get("/profile", tokenTestMiddleware, profileController);
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", tokenTestMiddleware, logoutController);

router.use((req, res) => {
  res.status(404).json({ message: '... not found error ...' })
})

module.exports = router;
