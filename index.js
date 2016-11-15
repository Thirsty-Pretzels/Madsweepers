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
    // to send stuff back to client side
    io.emit('updateBoard', board.board)
    io.emit('countMines', board.minesLeft);
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
    var playerId = data[0];
    var location = data[1];

    if (board.board[location.y][location.x].status === 0) {
      board.board[location.y][location.x].status = 2;
      //update the score according to the result;
      if(board.board[location.y][location.x].val === 9) {
        io.emit('updateScore', {id: playerId, scoreChange: scoreRevealMine});
        board.minesLeft--;
        io.emit('countMines', board.minesLeft);
      } else {
        io.emit('updateScore', {id: 'player'+playerId, scoreChange: scoreRevealspace});
        board.todos--;
      }
      if (board.minesLeft === 0){
        board.generate();
        setTimeout(function(){
          io.emit('updateBoard', board.board);
        }, 300);
      }
    }
    io.emit('updateBoard', board.board);
  });

  socket.on('DROP-FLAG', function(data){
    var playerId = data[0];
    var location = data[1];

    if ( board.board[location.y][location.x].status === 0 ) {
      // if the flag is dropped at a correct place
      if ( board.board[location.y][location.x].val === 9 ) {
        board.board[location.y][location.x].status = 1;
        //update board
        board.minesLeft--;
        io.emit('countMines', board.minesLeft);
        io.emit('updateBoard', board.board);
        //update score
        io.emit('updateScore', {id: 'player'+playerId, scoreChange: scoreRightFlag});
      } else {
      // if the flag is dropped at a wrong place
        board.board[location.y][location.x].status = 3;
        //update board
        io.emit('updateBoard', board.board);
        //update score
        io.emit('updateScore', {id: 'player'+playerId, scoreChange: scoreWrongFlag});
        //after 0.3, reset the corresponing grid to initial
        setTimeout(() => {
          board.board[location.y][location.x].status = 0;
          io.emit('updateBoard', board.board);
        }, 300);
      }
      if (board.minesLeft === 0){
        board.generate();
      }
    }
    console.log(board.todos, board.minesLeft);
  });

  socket.on('disconnect', function(){
    disconnectHandler(players, clients, socket);
  });
});

http.listen(3000, function(){
  console.log('IAM listening on *:3000, AMA');
});

module.exports = board;