const express = require('express');
const router = express.Router();
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const bandsController = require('../../controllers/api/bands');

// Use ensureLoggedIn middleware to protect routes
router.post('/', ensureLoggedIn, bandsController.addNewBand);
router.get('/', ensureLoggedIn, bandsController.getAllBands);
router.get('/:id', ensureLoggedIn, bandsController.getOneBand);


module.exports = router;