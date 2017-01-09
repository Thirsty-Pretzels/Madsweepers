module.exports = function(io, socket, room, user, gameManager, users, currentScores, clients) {
  console.log('new user enter room');
  if (!gameManager.rooms.hasOwnProperty(room)){
    io.to(socket.id).emit('roomListUpdate', gameManager.listRoom());
    return;
  }
  gameManager.rooms[room].players.addPlayer(user);
  gameManager.joinGame(room, user);
  socket.join(room);
  socket.emit('hasEnteredRoom', room);
  currentScores.push({id: user, scoreChange: 0});
  io.to(room).emit('roomInfoUpdate', gameManager.roomDetail(room, users));
  io.emit('roomListUpdate', gameManager.listRoom());
  clients[socket.id] = {'roomName': room, 'wrongFlag': 0, 'id': socket.id, 'user': user, 'loot': {'banana': 1, 'ammo': 10, 'shield': 0, 'party': 1}, 'stun': false};
  io.to(socket.id).emit('updateLoot', clients[socket.id]['loot']);
}