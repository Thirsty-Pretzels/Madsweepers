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
var clientRoom = {};

// Now the room name is hard coded
// we need to send the room name along with every communciation

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('createPlayer', function(playerId, roomName) {
    console.log(playerId, roomName, 'socket: createPlayer')

    socket.join(roomName);

    if ( !gameManager.rooms[roomName] ) {
      gameManager.createRoom(roomName);
    }

    console.log(socket.id, 'socketid');
    clientRoom[socket.id] = roomName;
    createPlayerHandler(io, roomName, gameManager.rooms[roomName].players, clients, socket, playerId, gameManager.rooms[roomName]['currentScores']);
 });

  socket.on('getNewBoard', function() {
    var roomName = clientRoom[socket.id];
    console.log(roomName, 'getting board for room name');
    io.to(roomName).emit('updateBoard', {type: 0, board: gameManager.rooms[roomName].board.board});  // to send stuff back to client side
    io.to(roomName).emit('countMines', gameManager.rooms[roomName].board.minesLeft);
  });

  socket.on('movePlayer', function(data) {
    var roomName = clientRoom[socket.id];
    console.log(roomName, 'room on move player');
    movePlayerHandler(io, roomName, gameManager.rooms[roomName].players, data);
  });

  socket.on('openSpace', function(data){
    var roomName = clientRoom[socket.id];
    console.log(roomName, 'room on open space');
    openSpaceHandler(io, roomName, gameManager.rooms[roomName].board, gameManager.rooms[roomName]['currentScores'], data);
  });

  socket.on('dropFlag', function(data){
    var roomName = clientRoom[socket.id];
    dropFlagHandler(io, roomName, gameManager.rooms[roomName].board, gameManager.rooms[roomName]['currentScores'], data);
  });

  socket.on('disconnect', function(){
    var roomName = clientRoom[socket.id];
    console.log(roomName, 'roomName when disconnecting');
    disconnectHandler(io, roomName, gameManager.rooms[roomName].players, gameManager.rooms[roomName]['currentScores'], clients, socket);
  });
});

var port = process.env.port || 3000;

http.listen(port, function(){
  console.log(`IAM listening on *:${port}, AMA`);
});

// module.exports = board;