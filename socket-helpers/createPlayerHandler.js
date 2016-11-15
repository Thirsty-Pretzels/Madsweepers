// socket helper function: create a player
module.exports = function(io, players, clients, socket, playerId) {
	playerId = playerId || ( '' + Math.floor( Math.random() * 10 ) );
  players.addPlayer(playerId);
  clients.push({'socket': socket, 'playerId': playerId})
  io.emit('updatePlayerLocations', players.playerLocations);
}