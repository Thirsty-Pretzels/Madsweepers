var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Board = require('./board.js');

// Generate a new Board with these dimensions
// Arguments currently hardcoded but can be randomly generated or chosen by user
var board = null;
function createBoard() {
  var rows = 30;
  var columns = 30;
  var dangerFactor = 0.2;
  var mineRow = 12;
  var mineCol = 12;

  board = new Board();
  board.generate(rows, columns, dangerFactor);
  board.flag(mineRow, mineCol, 'bigFatMine');
}

createBoard();

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('getBoard', function() {
    console.log('getting board on server')
    // to send stuff back to client side
    io.emit('getBoard', board)
  })

  socket.on('movePlayer', function(data) {
    console.log(data, 'received data from movePlayer');
    io.emit('movePlayer', data)
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

module.exports = board;