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

GameManager.prototype.createRoom = function(roomName, row, col, dangerFactor) {

  // var board = createBoard(row, col, dangerFactor);
  var players = createPlayers();
  var currentScores = [];
  var gameStatus = 'staging';

  this.rooms[roomName] = {row, col, dangerFactor, players, currentScores, gameStatus};
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

GameManager.prototype.roomDetail = function(roomName, users) {
  var userList = {};

  this.rooms[roomName].players.listPlayers().forEach((user) => {
    userList[user] = {};
    userList[user].userCode = users[user].userCode;
    userList[user].readyStatus = this.rooms[roomName].players.playerLocations[user].ready;

  });

  return {host: this.rooms[roomName].players.listPlayers()[0], userList: userList};
}

GameManager.prototype.startGame = function(roomName) {
  const row = this.rooms[roomName].row;
  const col = this.rooms[roomName].col;
  const dangerFactor = this.rooms[roomName].dangerFactor;
  this.rooms[roomName].gameStatus = 'gaming';
  this.rooms[roomName].board = createBoard(row, col, dangerFactor);
  this.rooms[roomName].currentScores.forEach(score => score.scoreChange = 0);
};

GameManager.prototype.endGame = function(roomName) {
  this.rooms[roomName].gameStatus = 'staging';
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


