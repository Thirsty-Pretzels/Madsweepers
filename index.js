var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Board = require('./board.js');

// Generate a new Board with these dimensions
// Arguments currently hardcoded but can be randomly generated or chosen by user
var board = null;
function createBoard() {
  var rows = 16;
  var columns = 22;
  var dangerFactor = 0.2;
  var mineRow = 12;
  var mineCol = 12;

  board = new Board();
  board.generate(rows, columns, dangerFactor);
  board.flag(mineRow, mineCol, 'bigFatMine');
  console.log('created newboard');
}

io.on('connection', function(socket){
  console.log('a user connected');

  if ( !board ) {
    createBoard();
  }

  socket.on('GET-NEW-BOARD', function() {
    // to send stuff back to client side
    io.emit('updateBoard', board.board);
  });

  socket.on('movePlayer', function(data) {
    //data process:
    const playerId = `player${data[1] + 1}`;
    var newPlayerLocation = data[2];

    switch(data[0]) {
      case 'UP':
        newPlayerLocation[data[1]] = {
          id: playerId,
          x: data[2][data[1]].x,
          y: data[2][data[1]].y - 1}
        break;
      case 'DOWN':
        newPlayerLocation[data[1]] = {
          id: playerId,
          x: data[2][data[1]].x,
          y: data[2][data[1]].y + 1}
        break;
      case 'LEFT':
        newPlayerLocation[data[1]] = {
          id: playerId,
          x: data[2][data[1]].x - 1,
          y: data[2][data[1]].y}
        break;
      case 'RIGHT':
        newPlayerLocation[data[1]] = {
          id: playerId,
          x: data[2][data[1]].x + 1,
          y: data[2][data[1]].y}
        break;
      default:
        break;
    }

    newPlayerLocation = newPlayerLocation ? newPlayerLocation :
      [ {id:'player1', x: 0, y: 0},
        {id:'player2', x: 9, y: 9},
        {id:'player3', x: 5, y: 5}];

    io.emit('update', [data[0], data[1], newPlayerLocation, data[3]])
  });

  socket.on('OPEN-SPACE', function(data){
    var playerId = data[0];
    var location = data[1];

    if (board.board[location.y][location.x].status === 0) {
      board.board[location.y][location.x].status = 2;
    }

    io.emit('updateBoard', board.board);
  });

  socket.on('DROP-FLAG', function(data){
    var playerId = data[0];
    var location = data[1];

    if ( board.board[location.y][location.x].status === 0 ) {
      board.board[location.y][location.x].status = 1;
    } else if ( board.board[location.y][location.x].status === 1 ) {
      board.board[location.y][location.x].status = 0;
    }

    io.emit('updateBoard', board.board);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

module.exports = board;