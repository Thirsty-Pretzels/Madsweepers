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
// This keeps track of all active players and their socket
var clients = [];
// This tracks players and their respective rooms
var clientRoom = {};
module.exports = clientRoom;

// Now the room name is hard coded
// we need to send the room name along with every communciation
var roomName = 'RoomA';

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('selectRoom', function (roomName, userName) {
    var roomName = roomName;
    clientRoom[userName] = roomName;
    console.log(clientRoom, 'client-room pair in selectRoom')
    // create a new room if the room does not exist.
    if ( !gameManager.rooms[roomName] ) {
      gameManager.createRoom(roomName);

  socket.on('getNewBoard', function() {
    //type 0 means that sending the whole board
    //type 1 means that sending the changes
    io.emit('updateBoard', {type: 0, board: gameManager.rooms[roomName].board.board});  // to send stuff back to client side
    io.emit('countMines', [gameManager.rooms[roomName].board.minesLeft, gameManager.rooms[roomName].board.minesCount]); //add total mine count

 
    } 

  });

  socket.on('getNewBoard', function() {
    console.log('getting board for room name:', roomName)
    io.emit('updateBoard', {type: 0, board: gameManager.rooms[roomName].board.board});  // to send stuff back to client side
    io.emit('countMines', gameManager.rooms[roomName].board.minesLeft);
  });

  socket.on('createPlayer', function(playerId) {
    createPlayerHandler(io, clientRoom, roomName, gameManager.rooms[roomName].players, clients, socket, playerId, gameManager.rooms[roomName]['currentScores']);
  })

  socket.on('movePlayer', function(data) {
    var playerId = data[0];
    var roomName = clientRoom[playerId];
    console.log(clientRoom,'client-room pair in movePlayer');
    movePlayerHandler(io, gameManager.rooms[roomName].players, data);
  });

  socket.on('openSpace', function(data){
    openSpaceHandler(io, gameManager.rooms[roomName].board, gameManager.rooms[roomName]['currentScores'], data);
  });

  socket.on('dropFlag', function(data){
    dropFlagHandler(io, gameManager.rooms[roomName].board, gameManager.rooms[roomName]['currentScores'], data);
  });

  socket.on('disconnect', function(){
    disconnectHandler(io, gameManager.rooms[roomName].players, gameManager.rooms[roomName]['currentScores'], clients, socket);
  });
});

http.listen(3000, function(){
  console.log('IAM listening on *:3000, AMA');
});

// module.exports = board;