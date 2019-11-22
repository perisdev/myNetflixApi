const express = require('express');
const router = express.Router();

// middlewares
const moviesFilterMiddleware = require('../middlewares/moviesFilterMiddleware');  // filter by 'id' and/or 'genre'.

// controllers
const moviesController = require('../controllers/moviesController');
const moviesPopularController = require('../controllers/moviesPopularController');  // sort by 'popularity'.
const moviesLatestController = require('../controllers/moviesLatestController'); // sort by 'release_date'.
const moviesPremieresController = require('../controllers/moviesPremieresController'); // return premieres.
const moviesGenresController = require('../controllers/moviesGenresController'); // return all genres.

// routes
router.get("/", moviesFilterMiddleware, moviesController);
router.get("/popular", moviesFilterMiddleware, moviesPopularController);
router.get("/latest", moviesFilterMiddleware, moviesLatestController);
router.get("/premieres", moviesFilterMiddleware, moviesPremieresController);
router.get("/genres", moviesGenresController);

router.use((req, res) => res.status(404).json({ message: 'The resource you requested could not be found' }))

module.exports = router;
