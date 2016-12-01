// socket helper function: move player

module.exports = function(io, roomName, players, data, boardSize, clients, socket, board) {
  const playerId = data[0];
  const direction = data[1];
  if (!clients[socket.id]['stun']){
    players.move(playerId, direction, boardSize);
    const playerLoc = players.playerLocations[playerId];

    if (board.board[playerLoc.y][playerLoc.x]['surface']['banana'] === true) {
      board.removeBanana(playerLoc.x, playerLoc.y);
      io.to(roomName).emit('broadcast', 'uh oh, ' + playerId + ' just slipped on a banana!!');
      io.to(roomName).emit('bananaUsed', {x: playerLoc.x, y: playerLoc.y});

      if (playerLoc.x > 0 && playerLoc.y > 0 && playerLoc.y < board.board.length && playerLoc.x < board.board[0].length){
        players.move(playerId, direction, boardSize);
      }

      clients[socket.id]['stun'] = true;

      setTimeout(function(){
        clients[socket.id]['stun'] = false;
      }, 5000);
    }

    io.to(roomName).emit('updatePlayerLocations', {newLocations: players.playerLocations, boardSize: boardSize});
  }
}