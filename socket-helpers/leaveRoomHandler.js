module.exports = function(io, socket, room, user, gameManager, clients, currentScores) {
  console.log('user leaves room');
  socket.leave(room);
  gameManager.rooms[room].players.removePlayer(user);

  currentScores = currentScores.reduce(function(a,c){ return c['id'] === clients[socket.id]['user'] ? a : a.concat(c) }, []);
  gameManager['rooms'][clients[socket.id]['roomName']]['currentScores'] = currentScores;

  socket.emit('allPlayersReady', false);
  socket.emit('hasLeftRoom', room);

  io.emit('roomListUpdate', gameManager.listRoom());
}