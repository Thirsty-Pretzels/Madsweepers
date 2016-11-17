var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Board = require('./board.js');
var Players = require('./players.js');
var GameManager = require('./gameManager.js');

// import helper function
var loginTempUserHandler = require('./socket-helpers/loginTempUserHandler');
var enterRoomHandler = require('./socket-helpers/enterRoomHandler');
var leaveRoomHandler = require('./socket-helpers/leaveRoomHandler');
var toggleReadyHandler = require('./socket-helpers/toggleReadyHandler');

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
// Generate two default rooms
gameManager.createRoom('roomA');
gameManager.createRoom('roomB');
// This keeps track of active player and its socket
var clients = {};
var clientRoom = {};

// This keeps track of active users and its socket
var users = {};

// Now the room name is hard coded
// we need to send the room name along with every communciation

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('loginTempUser', username => {
    loginTempUserHandler(io, socket, users, username, gameManager.listRoom());
  });

  socket.on('enterRoom', (info) => {
    if (info.inRoom) {
      leaveRoomHandler(io, socket, info.inRoomname, info.user, gameManager);
    }
    clientRoom[socket.id] = info.room;
    enterRoomHandler(io, socket, info.room, info.user, gameManager, gameManager.rooms[info.room]['currentScores'], clients);
  });

  socket.on('leaveRoom', (info) => {
    leaveRoomHandler(io, socket, info.room, info.user, gameManager);
  });

  socket.on('toggleReady', (info) => {
    toggleReadyHandler(io, socket, info.room, info.user, gameManager);
  });

 //  socket.on('createPlayer', function(playerId, roomName) {
 //    console.log(playerId, roomName, 'socket: createPlayer')

 //    socket.join(roomName);

 //    if ( !gameManager.rooms[roomName] ) {
 //      gameManager.createRoom(roomName);
 //    }

 //    console.log(socket.id, 'socketid');
 //    clientRoom[socket.id] = roomName;
 //    createPlayerHandler(io, roomName, gameManager, gameManager.rooms[roomName].players, clients, socket, playerId, gameManager.rooms[roomName]['currentScores']);
 // });

  socket.on('getNewBoard', function() {
    var roomName = clientRoom[socket.id];
    if (roomName){
      io.to(roomName).emit('updateBoard', {type: 0, board: gameManager.rooms[roomName].board.board});  // to send stuff back to client side
      io.to(roomName).emit('countMines', [gameManager.rooms[roomName].board.minesLeft, gameManager.rooms[roomName].board.minesLeft]);
    }
  });

  socket.on('movePlayer', function(data) {
    var roomName = clientRoom[socket.id];
    const boardSize = [gameManager.rooms[roomName].board.board[0].length, gameManager.rooms[roomName].board.board.length];

    movePlayerHandler(io, roomName, gameManager.rooms[roomName].players, data, boardSize);
    if (Math.floor((Date.now() - gameManager.rooms[roomName].board.time)) / 1000 / 60 >= 1){
      console.log('time\'s up');
      io.to(roomName).emit('endification');
    }
  });

  socket.on('openSpace', function(data){
    var roomName = clientRoom[socket.id];
    openSpaceHandler(io, roomName, gameManager.rooms[roomName].board, gameManager.rooms[roomName]['currentScores'], data);
  });

  socket.on('dropFlag', function(data){
    var roomName = clientRoom[socket.id];
    dropFlagHandler(io, roomName, gameManager.rooms[roomName].board, gameManager.rooms[roomName]['currentScores'], data);
  });

  socket.on('disconnect', function(){
    var roomName = clientRoom[socket.id];
    console.log(roomName, 'roomName when disconnecting');
    if(roomName){
      console.log('inside disconnect handler')
      disconnectHandler(io, gameManager, gameManager.rooms[roomName].players, gameManager.rooms[roomName]['currentScores'], clients, socket);
    }
  });
});


var port = process.env.PORT || 3000;

http.listen(port, function(){
  console.log(`IAM listening on *:${port}, AMA`);
});

// module.exports = board;