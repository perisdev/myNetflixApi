const express = require('express');
const router = express.Router();

// middlewares
const tokenTestMiddleware = require('../middlewares/tokenTestMiddleware');

// controllers
const orderController = require('../controllers/orderController');

// routes
router.use(tokenTestMiddleware);

router.post("/", orderController);
router.get("/delivery", orderController);

module.exports = router;
