// socket helper function: move player
// var func;

module.exports = function(io, roomName, players, data, boardSize, clients, socket, board) {
  const playerId = data[0];
  const direction = data[1];
  if (!clients[socket.id]['stun']){
    // clearTimeout(func);
    players.move(playerId, direction, boardSize);
    const playerLoc = players.playerLocations[playerId];
    if (board[playerLoc[0]][playerLoc[1]]['surface']['banana'] === true) {
      if (playerLoc[0] > 0 && playerLoc[1] > 0 && playerLoc[0] < board.board.length && playerLoc[1] < board.board[0].length){
        players.move(playerId, direction, boardSize);
      }
      board.removeBanana(playerLoc[0], playerLoc[1]);
      clients[socket.id]['stun'] = true;
      setTimeout(function(){
        clients[socket.id]['stun'] = false;
      }, 5000);
    }
    io.to(roomName).emit('updatePlayerLocations', {newLocations: players.playerLocations, boardSize: boardSize});
    // func = setTimeout(() => {
    //   players.resetDirectionStatus(playerId);
    //   io.to(roomName).emit('updatePlayerLocations', {newLocations: players.playerLocations, boardSize: boardSize});
    //   // }
    // }, 200);
  }
}