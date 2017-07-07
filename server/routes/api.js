const gameServer = require('../gameServer');
const express = require('express');
const fs = require('fs');
const router = express.Router();
const servers = [];

// endpoints 
router.get('/board', (req, res) => res.json(getMoves().game_board))
router.get('/games/:idx', (req, res) => res.json(getMoves().past_moves_board[req.params.idx]))
router.put('/game/start', (req, res) => {
  StreamServer.stream();
  return res.json('started');
})

// only here so that server can be started via node.js and/or controlled via API
class StreamServer {
  static start() {
    console.log('streamServer start');
    var svr = new gameServer();
    svr.startServer();
    this.servers = [svr];
  }
  static stream() {
    console.log('streaming servers ', this.servers.length);
    var centuryMoves = JSON.parse( fs.readFileSync('uploads/century.json') );
    this.servers.forEach(svr => svr.streamMoves(centuryMoves));
  }
}

function getMoves() {
  var chessMoves = fs.readFileSync('uploads/8_8_50.json');
  return JSON.parse(chessMoves);
}

module.exports = {
  router: router,
  StreamServer: StreamServer
};
