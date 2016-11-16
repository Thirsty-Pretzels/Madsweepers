module.exports = function(io, socket, room, user, gameManager) {
  console.log('user leaves room');
  socket.leave(room);
  gameManager.rooms[room].players.removePlayer(user);
  socket.emit('hasLeftRoom', room);
  io.emit('roomListUpdate', gameManager.listRoom());
}