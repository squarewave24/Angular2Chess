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

// UPLOADER code *******************
// cors for uploader
app.use(cors());
const upload = multer({
  dest: 'uploads/',
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
    }
  })
});
app.post('/upload', upload.any(), (req, res) => {
  res.json(req.files.map(file => {
    let ext = path.extname(file.originalname);
    console.log('req.files: ', req.files);
    console.log('req.body: ', req.body);
    // console.log('bodyParser.text: ', bodyParser.text());

    // res.end(JSON.stringify(req.body, null, 2));

    return {
      originalName: file.originalname,
      filename: file.filename
    }
  }));
});
app.listen(10050, () => {
  console.log('ng2-uploader server running on port 10050.');
});

// uploader code *****

// api 
  // var router = express.Router();              // get an instance of the express Router
 
  // app.use('/api', router);

// 

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// resources
app.use(express.static( 'styles'));
app.use(express.static( 'scripts'));

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