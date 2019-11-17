const express = require('express');
const router = express.Router();

// middlewares
const tokenTestMiddleware = require('../middlewares/tokenTestMiddleware');

// controllers
const orderController = require('../controllers/orderController');

// routes
router.post("/", tokenTestMiddleware, orderController);

module.exports = router;
