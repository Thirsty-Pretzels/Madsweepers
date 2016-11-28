var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// var Board = require('./board.js');
// var Players = require('./players.js');
var GameManager = require('./gameManager.js');
// // To uncomment when running db
// var {runDataBase, db, getHighScoresFromDb, saveHighScoresInDb} = require('./redis.js');

// import helper function
var loginTempUserHandler = require('./socket-helpers/loginTempUserHandler');
var enterRoomHandler = require('./socket-helpers/enterRoomHandler');
var leaveRoomHandler = require('./socket-helpers/leaveRoomHandler');
var toggleReadyHandler = require('./socket-helpers/toggleReadyHandler');

var dropFlagHandler = require('./socket-helpers/dropFlagHandler');
var openSpaceHandler = require('./socket-helpers/openSpaceHandler');
var movePlayerHandler = require('./socket-helpers/movePlayerHandler');
var disconnectHandler = require('./socket-helpers/disconnectHandler');
var dancePartyHandler = require('./socket-helpers/dancePartyHandler');
var updateCurrentScores = require('./socket-helpers/updateCurrentScores.js');

// // To uncomment when running db
// // MJ: initialize redisDatabase.
// runDataBase();

// define score amounts by each operation
global.scoreRevealMine = -10;
global.scoreRevealspace = 1;
global.scoreRightFlag = 10;
global.scoreWrongFlag = -5;
global.scoreGetShot = -3;

// Create gameManager when server starts
var gameManager = new GameManager();
// Generate two default rooms
gameManager.createRoom('HR48');
gameManager.createRoom('Trump Not President');
// This keeps track of active player and its socket
var clients = {roomName: null};

// This keeps track of active users and its socket
var users = {};

io.on('connection', function(socket){
  console.log('a user connected');

  clients[socket.id] = {};


  socket.on('loginTempUser', username => {
    loginTempUserHandler(io, socket, users, username, gameManager.listRoom());
  });

  socket.on('enterRoom', (info) => {
    if (info.inRoom) {
      leaveRoomHandler(io, socket, info.inRoomname, info.user, gameManager, users, clients, gameManager.rooms[info.inRoomname]['currentScores']);
    }
    clients[socket.id]['roomName'] = info.room;
    enterRoomHandler(io, socket, info.room, info.user, gameManager, users, gameManager.rooms[info.room]['currentScores'], clients);
  });

  socket.on('leaveRoom', (info) => {
    var roomName = clients[socket.id]['roomName'];
    leaveRoomHandler(io, socket, info.room, info.user, gameManager, users, clients, gameManager.rooms[info.room]['currentScores']);
  });

  socket.on('toggleReady', (info) => {
    toggleReadyHandler(io, socket, info.room, info.user, gameManager, users, clients);
  });

  socket.on('createNewRoom', (info) => {
    gameManager.createRoom(info.roomName, info.row, info.col, info.mineDensity, io, socket.id);
    io.emit('roomListUpdate', gameManager.listRoom());
  });

  socket.on('getNewBoard', function() {
    var roomName = clients[socket.id]['roomName'];
    if (roomName){
      io.to(roomName).emit('updateBoard', {type: 0, board: gameManager.rooms[roomName].board.board});  // to send stuff back to client side
      io.to(roomName).emit('countMines', [gameManager.rooms[roomName].board.minesLeft, gameManager.rooms[roomName].board.minesLeft]);
    }
  });

  socket.on('danceParty', function(){
    var roomName = clients[socket.id]['roomName'];
    var myUserName = clients[socket.id].user;
    io.to(roomName).emit('broadcast', myUserName + ' said: Sometimes, You just gotta dance!!!');
    dancePartyHandler(io, socket, gameManager, roomName, myUserName, users, clients);
  });

  socket.on('movePlayer', function(data) {
    var roomName = clients[socket.id]['roomName'];
    if (!gameManager.rooms.hasOwnProperty(roomName)){
      io.to(socket.id).emit('badRoom');
      console.log('bad room');
      return;
    }
    const boardSize = [gameManager.rooms[roomName].board.board[0].length, gameManager.rooms[roomName].board.board.length];
    movePlayerHandler(io, roomName, gameManager.rooms[roomName].players, data, boardSize, clients, socket, gameManager.rooms[roomName].board);

    if ((Date.now() - gameManager.rooms[roomName].board.time) / 1000 / 60 >= 1){
      console.log('time\'s up');
      io.to(roomName).emit('endification', gameManager.endGame(roomName));
    }
  });

  socket.on('getStun', function(data){
    if(clients[socket.id]['loot']['shield'] > 0){
      clients[socket.id]['loot']['shield']--;
      io.to(socket.id).emit('updateLoot', clients[socket.id]['loot']);
      return;
    }
    clients[socket.id]['stun'] = true;
    var roomName = clients[socket.id].roomName;
    var playerId = clients[socket.id].user;
    io.to(roomName).emit('broadcast', 'Hahahahaha, ' + playerId + ' just got shot!!!');
    io.to(roomName).emit('updateScore', {id: playerId, scoreChange: scoreGetShot});
    gameManager.addRecordEntry(roomName, 'GetShot', playerId);
    updateCurrentScores(gameManager.rooms[roomName]['currentScores'], {id: playerId, scoreChange: scoreGetShot}, io, roomName, gameManager);
    setTimeout(function(){
      clients[socket.id]['stun'] = false;
    }, 5000);
  });

  socket.on('bananaOut', function(data){
    var roomName = clients[socket.id]['roomName'];
    if(clients[socket.id]['loot']['banana'] > 0 && gameManager.rooms[roomName].board.placeBanana(data.x, data.y)){
      clients[socket.id]['loot']['banana']--;
      io.to(socket.id).emit('bananaPlaced', {x: data.x, y: data.y});
    }
    io.to(roomName).emit('broadcast', 'Be careful, ' + ['evil', 'sneaky', 'bad-ass'][Math.floor(Math.random()*3)] + ' '+ clients[socket.id].user + ' just put a banana peal on the floor!');
    io.to(socket.id).emit('updateLoot', clients[socket.id]['loot']);
  });

  socket.on('shoot', function(data){
    if(clients[socket.id]['loot']['ammo'] > 0){
      clients[socket.id]['loot']['ammo']--;
      io.to(clients[socket.id]['roomName']).emit('bulletOut', data, Math.floor(Math.random() * 100000000000).toString(36));
      io.to(socket.id).emit('updateLoot', clients[socket.id]['loot']);
    }
  });

  socket.on('openSpace', function(data){
    var roomName = clients[socket.id]['roomName'];
    openSpaceHandler(io, socket, clients, roomName, gameManager.rooms[roomName].board, gameManager.rooms[roomName]['currentScores'], data, gameManager);
  });

  socket.on('dropFlag', function(data){
    var roomName = clients[socket.id]['roomName'];
    dropFlagHandler(io, roomName, gameManager.rooms[roomName].board, gameManager.rooms[roomName]['currentScores'], data, socket, clients, gameManager);
  });

  socket.on('getHighScores', function(){
    getHighScoresFromDb(io);
  });

  socket.on('saveHighScores', function(scores){
    //MJ: save scores, then broadcast new scores to everyone across rooms
    saveHighScoresInDb(scores);
    getHighScoresFromDb(io);
  });

  socket.on('disconnect', function(){
    var roomName = clients[socket.id]['roomName'];
    if(roomName){
      disconnectHandler(io, gameManager, gameManager.rooms[roomName].players, gameManager.rooms[roomName]['currentScores'], clients, socket, users);
    }
  });
});


var port = process.env.PORT || 3000;

http.listen(port, function(){
  console.log(`IAM listening on *:${port}, AMA`);
});

// module.exports = board;