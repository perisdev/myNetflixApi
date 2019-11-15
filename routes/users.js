const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const logoutController = require("../controllers/logoutController");
const profileController = require("../controllers/profileController");

const loggingMiddleware = require('../middlewares/loggingMiddleware');
const authorizationMiddleware = require("../middlewares/authorizationMiddleware");

let express = require('express');
let router = express.Router();

// router.use(loggingMiddleware);

// router.get("/me", authorizationMiddleware, profileController);

// router.post("/register", registerController);

// router.post("/login", loginController);

// router.get("/logout",authorizationMiddleware, logoutController);

router.use( (req,res) => {
    res.status(404).json({message:'... not found error ...'})
})

module.exports = router;
