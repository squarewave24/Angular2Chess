const gameServer = require('../gameServer');
const express = require('express');
const fs = require('fs');
const router = express.Router();
const servers = [];

// endpoints 
router.get('/board', (req, res) => res.json(getMoves().game_board))
router.get('/games/:idx', (req, res) => res.json(getMoves().past_moves_board[req.params.idx]))
router.put('/engine/start', (req, res) => {
  startEngineServer();
  return res.json('started');
})
router.put('/game/start', (req, res) => {
  startGame();
  return res.json('started');
})

function getMoves() {
  var chessMoves = fs.readFileSync('uploads/8_8_50.json');
  return JSON.parse(chessMoves);
}

function startEngineServer() {
  console.log('starting game server');
  var svr = new gameServer();
  svr.startServer();
  servers.push(svr);
}

function startGame() { 
  var centuryMoves = JSON.parse( fs.readFileSync('uploads/century.json') );
  servers.forEach(svr => svr.streamMoves(centuryMoves));
}

module.exports = router;