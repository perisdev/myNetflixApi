const express = require('express');
const router = express.Router();

// controllers
const priceController = require('../controllers/priceController');

// routes
router.get("/", priceController);

router.use((req, res) => res.status(404).json({ message: 'The resource you requested could not be found' }))

module.exports = router;
