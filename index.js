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
    
    console.log('newPosition: ', newPlayerLocation);
    console.log(data[0], data[1]);
    io.emit('update', [data[0], data[1], newPlayerLocation, data[3]])
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

module.exports = board;