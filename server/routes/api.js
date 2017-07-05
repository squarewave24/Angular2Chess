const express = require('express');
const fs = require('fs');


const router = express.Router();


// endpoints 
router.get('/board', (req, res) => res.json(getMoves().game_board))
router.get('/games/:idx', (req, res) => res.json(getMoves().past_moves_board[req.params.idx]))

function getMoves() {
  var chessMoves = fs.readFileSync('uploads/8_8_50.json');
  return JSON.parse(chessMoves);
  // console.log('chessMoves ', jsonContent);
}




// declare axios for making http requests
// const axios = require('axios');
// const API = 'https://jsonplaceholder.typicode.com';
// Get all posts
// router.get('/posts', (req, res) => {
//   // Get posts from the mock api
//   // This should ideally be replaced with a service that connects to MongoDB
//   axios.get(`${API}/posts`)
//     .then(posts => {
//       res.status(200).json(posts.data);
//     })
//     .catch(error => {
//       res.status(500).send(error)
//     });
// });
module.exports = router;