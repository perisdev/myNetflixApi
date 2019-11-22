const express = require('express');
const router = express.Router();

// controllers
const cityController = require('../controllers/cityController');

// routes
router.get("/", cityController);

router.use((req, res) => res.status(404).json({ message: 'The resource you requested could not be found' }))

module.exports = router;
