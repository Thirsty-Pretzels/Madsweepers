// socket helper function: create a player
//var clientRoom = require('../index.js');

module.exports = function(io, clientRoom, roomName, players, clients, socket, playerId, currentScores) {
  playerId = playerId || ( '' + Math.floor( Math.random() * 10 ) );
  players.addPlayer(playerId);
  clients.push({'socket': socket, 'playerId': playerId});
  clientRoom[playerId] = roomName;
  io.emit('updatePlayerLocations', players.playerLocations);
  // the first time the system update score, we can't only sent the changes, since the client end doesn't have the reference
  // need to send all the score record
  currentScores.push({id: playerId, scoreChange: 0});
  io.emit('updateScore', currentScores);
}