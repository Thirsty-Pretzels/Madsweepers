// socket helper function: move player
module.exports = function(io, players, data) {
  console.log('Tring to move a player, ', data);
  const playerId = data[0];
  const direction = data[1];

  players.move(playerId, direction);

  io.emit('updatePlayerLocations', players.playerLocations);

}