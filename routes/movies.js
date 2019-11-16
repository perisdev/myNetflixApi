const express = require('express');
const router = express.Router();

const moviesFilterController = require('../controllers/moviesFilterController');

router.get("/", moviesFilterController);

module.exports = router;
