const express = require('express');
const router = express.Router();

// middlewares
const moviesFilterMiddleware = require('../middlewares/moviesFilterMiddleware');  // filter by 'id' and/or 'genre'.

// controllers
const moviesController = require('../controllers/moviesController');
const moviesPopularController = require('../controllers/moviesPopularController');  // sort by 'popularity'.
const moviesLatestController = require('../controllers/moviesLatestController'); // sort by 'release_date'.

// routes
router.use(moviesFilterMiddleware);

router.get("/", moviesController);
router.get("/popular", moviesPopularController);
router.get("/latest", moviesLatestController);

module.exports = router;
