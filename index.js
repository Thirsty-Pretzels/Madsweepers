var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Board = require('./board.js');
var Players = require('./players.js');

// define score amounts by each operation
var scoreRevealMine = -10;
var scoreRevealspace = 1;
var scoreRightFlag = 10;
var scoreWrongFlag = -5;
var clients = [];

// Generate a new Board with these dimensions
// Arguments currently hardcoded but can be randomly generated or chosen by user
var board = null;
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
    // to send stuff back to client side
    io.emit('updateBoard', board.board);
  });

  socket.on('CREATE-PLAYER', function(playerId) {
    playerId = playerId || ( '' + Math.floor( Math.random() * 10 ) );
    players.addPlayer(playerId);
    clients.push({'socket': socket, 'playerId': playerId})
    io.emit('updatePlayerLocations', players.playerLocations);
  })

  socket.on('movePlayer', function(data) {
    //data process:
    console.log('Tring to move a player, ', data);
    const playerId = data[0];
    const direction = data[1];

    players.move(playerId, direction);

    io.emit('updatePlayerLocations', players.playerLocations);
  });

  socket.on('OPEN-SPACE', function(data){
    var playerId = data[0];
    var location = data[1];

    if (board.board[location.y][location.x].status === 0) {
      board.board[location.y][location.x].status = 2;
      //update the score according to the result;
      if(board.board[location.y][location.x].val === 9) {
        io.emit('updateScore', {id: playerId, scoreChange: scoreRevealMine});
        board.minesLeft--;
        console.log('mines left: ', board.minesLeft);
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
        console.log('mines left: ', board.minesLeft);
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

  socket.on('disconnect', function(...test){
    console.log('user disconnected');
    clients.forEach(function(x, i){
      if (x['socket'] === socket){
        players.removePlayer(x['playerId']);
        clients.splice(i, 1);
      }
    });
  });
});

http.listen(3000, function(){
  console.log('IAM listening on *:3000, AMA');
});

module.exports = board;