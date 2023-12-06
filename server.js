const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

// Always require and configure near the top
require('dotenv').config();
// Connect to the database
require('./config/database');


const app = express();

console.log("Server starting...");

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/checkToken'));

const port = process.env.PORT || 3001;

const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/bands', ensureLoggedIn, require('./routes/api/bandsRoute'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/', ensureLoggedIn, require('./routes/api/comment'));


console.log("Middleware registered for /bands route...");

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder



console.log("Middleware registered for checkToken...");



// Put API routes here, before the "catch all" route


console.log("API routes registered...");

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function(req, res) {
  console.log("Handling catch-all route...");
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});