// socket helper function: move player
// var func;

module.exports = function(io, roomName, players, data, boardSize, clients, socket) {
  const playerId = data[0];
  const direction = data[1];

  if (!clients[socket.id]['stun']){
    // clearTimeout(func);
    players.move(playerId, direction);
    io.to(roomName).emit('updatePlayerLocations', {newLocations: players.playerLocations, boardSize: boardSize});
    // func = setTimeout(() => {
    //   players.resetDirectionStatus(playerId);
    //   io.to(roomName).emit('updatePlayerLocations', {newLocations: players.playerLocations, boardSize: boardSize});
    //   // }
    // }, 200);
  }
}