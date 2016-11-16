module.exports = function(io, socket, room, user, gameManager, currentScores) {
  console.log('new user enter room');
  gameManager.rooms[room].players.addPlayer(user);
  socket.join(room);
  socket.emit('hasEnteredRoom', room);
  currentScores.push({id: user, scoreChange: 0});
  io.emit('roomListUpdate', gameManager.listRoom());
}