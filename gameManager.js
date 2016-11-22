var Board = require('./board.js');
var Players = require('./players.js');

function createBoard(rows, columns, dangerFactor) {
  rows = rows ? rows : 20;
  columns = columns ? columns : 30;
  dangerFactor = dangerFactor ? dangerFactor : 0.2;

  var board = new Board();
  board.generate(rows, columns, dangerFactor, Date.now());
  console.log('created newboard');

  return board;
};

function createPlayers() {
  var players = new Players();
  return players
};

var GameManager = function() {
  this.rooms = {};
  this.roomCount = 0;
};

GameManager.prototype.createRoom = function(roomName, row, col, dangerFactor, io, id) {

  var players = createPlayers();
  var currentScores = [];
  var gameRecord = [];
  var gameStatus = 'staging';
  if (roomName.match(/[A-Z]/gi)){
    roomName = roomName.split('').filter(function(a){
      return a.match(/[A-Z]/gi) || a === ' ';
    }).join('');
    this.rooms[roomName] = {row, col, dangerFactor, players, currentScores, gameRecord, gameStatus};
  } else {
    io.to(id).emit('badRoomName');
  }
};

GameManager.prototype.listRoom = function() {
 var roomList = [];
 for (var roomName in this.rooms) {
   roomList.push({
     roomName: roomName,
     numberOfPlayer: this.rooms[roomName].players.playerCount,
     roomStatus: this.rooms[roomName].gameStatus,
     minesLeft: (this.rooms[roomName].board) ? this.rooms[roomName].board.minesLeft : 0,
     minesCount: (this.rooms[roomName].board) ? this.rooms[roomName].board.minesCount : 0,
     host: this.rooms[roomName].players.listPlayers()[0]
   })
 }

 return roomList;

};

GameManager.prototype.roomDetail = function(roomName, users, clients) {
  var userList = {};
  console.log(users);
  this.rooms[roomName].players.listPlayers().forEach((user) => {
    userList[user] = {};
    userList[user].userCode = users[user].userCode;
    userList[user].readyStatus = this.rooms[roomName].players.playerLocations[user].ready;

  });

  return {host: this.rooms[roomName].players.listPlayers()[0], userList: userList};
}

GameManager.prototype.addRecordEntry = function(roomName, event, scorer, scoree) {
  // Event List:
  // open a space:           0
  // step on a mine:         1
  // flag correctly:         2
  // flag on a wrong place:  3
  // get shot:               4
  // place a banana:         5
  // step on a banana:       6
  // using shield:           7
  // fire dance party:       8
  this.rooms[roomName].gameRecord.push([event, scorer, scoree]);
}

GameManager.prototype.startGame = function(roomName) {
  if ( this.rooms[roomName].gameStatus === 'staging' ) {
    const row = this.rooms[roomName].row;
    const col = this.rooms[roomName].col;
    const dangerFactor = this.rooms[roomName].dangerFactor;
    this.rooms[roomName].gameStatus = 'gaming';
    this.rooms[roomName].board = createBoard(row, col, dangerFactor);
    this.rooms[roomName].currentScores.forEach(score => score.scoreChange = 0);
    this.gameRecord = [];
  }
};

GameManager.prototype.endGame = function(roomName) {
  this.rooms[roomName].gameStatus = 'staging';
  this.rooms[roomName].gameRecord.forEach((recordEntry) => {
    console.log('game ended: ', recordEntry);
  });
}

GameManager.prototype.removeRoom = function(roomName) {
  delete this.rooms[roomName];
};

module.exports = GameManager;

// uncomment for example
// var gameManager = new GameManager();
// gameManager.createRoom('newRoom');
// gameManager.createRoom('anotherRoom');
// console.log(gameManager.rooms);


