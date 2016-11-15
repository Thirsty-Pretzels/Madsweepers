var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Board = require('./board.js');
var Players = require('./players.js');

// import helper function
var dropFlagHandler = require('./socket-helpers/dropFlagHandler');
var openSpaceHandler = require('./socket-helpers/openSpaceHandler');
var movePlayerHandler = require('./socket-helpers/movePlayerHandler');
var disconnectHandler = require('./socket-helpers/disconnectHandler');
var createPlayerHandler = require('./socket-helpers/createPlayerHandler');

// define score amounts by each operation
global.scoreRevealMine = -10;
global.scoreRevealspace = 1;
global.scoreRightFlag = 10;
global.scoreWrongFlag = -5;

// Generate a new Board with these dimensions
// Arguments currently hardcoded but can be randomly generated or chosen by user
var board = null;
var clients = [];
function createBoard(rows, columns, dangerFactor) {
  rows = rows ? rows : 12;
  columns = columns ? columns : 12;
  dangerFactor = dangerFactor ? dangerFactor : 0.2;

  board = new Board();
  board.generate(rows, columns, dangerFactor);
  console.log('created newboard');
}

// Generate Players object to manage player locations and potentially status.
var players = null;
function createPlayers() {
  players = new Players();
}

io.on('connection', function(socket){
  console.log('a user connected');
  // create a new board if no board exists.
  if ( !board ) {
    createBoard();
  }
  // create a new players object if none exists.
  if ( !players ) {
    createPlayers();
  }

  socket.on('GET-NEW-BOARD', function() {
    io.emit('updateBoard', board.board);  // to send stuff back to client side
  });

  socket.on('CREATE-PLAYER', function(playerId) {
    createPlayerHandler(io, players, clients, socket, playerId);
  })

  socket.on('movePlayer', function(data) {
    movePlayerHandler(io, players, data);
  });

  socket.on('OPEN-SPACE', function(data){
    openSpaceHandler(io, board, data);
  });

  socket.on('DROP-FLAG', function(data){
    dropFlagHandler(io, board, data);
  });

  socket.on('disconnect', function(){
    disconnectHandler(players, clients);
  });
});

http.listen(3000, function(){
  console.log('IAM listening on *:3000, AMA');
});

module.exports = board;