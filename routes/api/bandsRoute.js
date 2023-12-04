const express = require('express');
const router = express.Router();
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const bandsController = require('../../controllers/api/bands'); // Update the import path
console.log(bandsController)
// GET /guitars
router.get("/", bandsController.index);
// Use ensureLoggedIn middleware to protect routes
router.get("/new", ensureLoggedIn, bandsController.new);
// GET /bands/:id (show functionality) MUST be below new route


router.post("/bands", ensureLoggedIn, (req, res) => {
    console.log('Received POST request to /bands');
    bandsController.create(req, res);
  });

module.exports = router;