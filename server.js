// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
// Get our API routes
const api = require('./server/routes/api');
const app = express();

const gameServer = require('./server/gameServer');

api.StreamServer.start();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set up api routes
app.use('/api', api.router);

// resources
app.use(express.static('styles'));
app.use(express.static('scripts'));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server and listen. you never listen.
 */
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));
