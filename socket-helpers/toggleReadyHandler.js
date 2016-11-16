module.exports = function(io, socket, room, user, gameManager) {
  gameManager.rooms[room].players.playerLocations[user].ready = !gameManager.rooms[room].players.playerLocations[user].ready;
  socket.emit('hasToggledReady', 'ok');

  // check whehter everybody is ready
  var isAllPlayersReady = Object.keys(gameManager.rooms[room].players.playerLocations).reduce(function(a, b) {
  	return a && gameManager.rooms[room].players.playerLocations[b].ready;
  }, true);

  if(isAllPlayersReady) {
  	io.to(room).emit('updateBoard', gameManager.rooms[room].board);
    io.to(room).emit('updateScore', gameManager.rooms[room].currentScores);
  	io.to(room).emit('updatePlayerLocations', gameManager.rooms[room].players.playerLocations);
  }
  io.to(room).emit('allPlayersReady', isAllPlayersReady);
};