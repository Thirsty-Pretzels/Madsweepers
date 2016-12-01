module.exports = function(io, socket, room, user, gameManager, users, clients, currentScores) {
  console.log('user leaves room');
  if (!room){
    return;
  }
  socket.leave(room);
  gameManager.rooms[room].players.removePlayer(user);

  currentScores = currentScores.reduce(function(a,c){ return c['id'] === clients[socket.id]['user'] ? a : a.concat(c) }, []);
  gameManager['rooms'][clients[socket.id]['roomName']]['currentScores'] = currentScores;

  socket.emit('allPlayersReady', false);
  socket.emit('hasLeftRoom', room);

  io.to(room).emit('roomInfoUpdate', gameManager.roomDetail(room, users));
  io.emit('roomListUpdate', gameManager.listRoom());

  var playerList = Object.keys(gameManager.rooms[room].players.playerLocations);
  var isAllPlayersReady = playerList.length !==0 && playerList.reduce(function(a, b) {
    return a && gameManager.rooms[room].players.playerLocations[b].ready;
  }, true);

  if(isAllPlayersReady) {
    // calculate board size
    gameManager.startGame(room);

    console.log('trying to restart the game for room ', room);

    var boardSize = [gameManager.rooms[room].board.board[0].length, gameManager.rooms[room].board.board.length];

    io.to(room).emit('updateBoard', {type: 0, board: gameManager.rooms[room].board.board});
    io.emit('roomListUpdate', gameManager.listRoom());
    io.to(room).emit('updateScore', gameManager.rooms[room].currentScores);
    io.to(room).emit('updatePlayerLocations', {newLocations: gameManager.rooms[room].players.playerLocations, boardSize: boardSize});
    io.to(room).emit('updateGameTime', gameManager.rooms[room].board.time);
  }
  io.to(room).emit('allPlayersReady', isAllPlayersReady);

}