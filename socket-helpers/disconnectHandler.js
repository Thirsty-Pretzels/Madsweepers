// socket helper function: when a player gets disconnected
module.exports = function(io, gameManager, players, currentScores, clients, socket, users) {
  players.removePlayer(clients[socket.id]['user']);
  currentScores = currentScores.filter(function(c){
    return c['id'] !== clients[socket.id]['user'];
  });
  gameManager['rooms'][clients[socket.id]['roomName']]['currentScores'] = currentScores;
  io.to(clients[socket.id['roomName']]).emit('updateScore', currentScores);
  delete users[clients[socket.id]['user']];
  delete clients[socket.id];

  console.log('user disconnected');
}