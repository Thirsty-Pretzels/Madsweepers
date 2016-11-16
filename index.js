var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Board = require('./board.js');
var Players = require('./players.js');
var GameManager = require('./gameManager.js');

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

// Create gameManager when server starts
var gameManager = new GameManager();
// This keeps track of active player and its socket
var clients = [];

// Now the room name is hard coded
// we need to send the room name along with every communciation

var getRoomName = (clients) => {
  var room = '';
  clients.forEach(function(obj) {
    if (obj.roomName) {
      console.log(obj.roomName, 'returning this in getRoomName');
      room = obj.roomName;
      return;
    }
  });
  return room;
}

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('createPlayer', function(playerId, roomName) {
    console.log(playerId, roomName, 'socket: createPlayer')
    var roomName = roomName;
    if ( !gameManager.rooms[roomName] ) {
      gameManager.createRoom(roomName);
    }
    createPlayerHandler(io, roomName, gameManager.rooms[roomName].players, clients, socket, playerId, gameManager.rooms[roomName]['currentScores']);
 });

  socket.on('getNewBoard', function() {
    var roomName = getRoomName(clients);
    console.log(roomName, 'getting board for room name');
    io.emit('updateBoard', {type: 0, board: gameManager.rooms[roomName].board.board});  // to send stuff back to client side
    io.emit('countMines', gameManager.rooms[roomName].board.minesLeft);
  });

  socket.on('movePlayer', function(data) {
    var roomName = getRoomName(clients);
    console.log(roomName, 'room on move player');
    movePlayerHandler(io, gameManager.rooms[roomName].players, data);
  });

  socket.on('openSpace', function(data){
    var roomName = getRoomName(clients);
    console.log(roomName, 'room on open space');
    openSpaceHandler(io, gameManager.rooms[roomName].board, gameManager.rooms[roomName]['currentScores'], data);
  });

  socket.on('dropFlag', function(data){
    var roomName = getRoomName(clients);
    dropFlagHandler(io, gameManager.rooms[roomName].board, gameManager.rooms[roomName]['currentScores'], data);
  });

  socket.on('disconnect', function(){
    var roomName = getRoomName(clients);
    disconnectHandler(io, gameManager.rooms[roomName].players, gameManager.rooms[roomName]['currentScores'], clients, socket);
  });
});

http.listen(3000, function(){
  console.log('IAM listening on *:3000, AMA');
});

// module.exports = board;