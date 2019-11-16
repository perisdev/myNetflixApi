const express = require('express');
const router = express.Router();

const tokenTestMiddleware = require('../middlewares/tokenTestMiddleware');
const orderController = require('../controllers/orderController');

router.post("/", tokenTestMiddleware, orderController);

module.exports = router;
