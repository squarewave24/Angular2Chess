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

// var games = new gameServer();
// var svr = games.startServer();
// games.streamRandomMoves(svr);


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set up api routes
app.use('/api', api);

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
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));


// UPLOADER code *******************
// cors for uploader
// app.use(cors());
// const upload = multer({
//   dest: 'uploads/',
//   storage: multer.diskStorage({
//     filename: (req, file, cb) => {
//       let ext = path.extname(file.originalname);
//       cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
//     }
//   })
// });
// app.post('/upload', upload.any(), (req, res) => {
//   res.json(req.files.map(file => {
//     let ext = path.extname(file.originalname);
//     console.log('req.files: ', req.files);
//     console.log('req.body: ', req.body);
//     return {
//       originalName: file.originalname,
//       filename: file.filename
//     }
//   }));
// });
// app.listen(10050, () => {
//   console.log('ng2-uploader server running on port 10050.');
// });