// socket helper function: when a player gets disconnected
module.exports = function(io, gameManager, players, currentScores, clients, socket) {
  players.removePlayer(clients[socket.id]['user']);
  currentScores = currentScores.reduce(function(a,c){ return c['id'] === clients[socket.id]['user'] ? a : a.concat(c) }, []);
  gameManager['rooms'][clients[socket.id]['roomName']]['currentScores'] = currentScores;
  io.to(clients[socket.id['roomName']]).emit('updateScore', currentScores);
  delete clients[socket.id];
  // clients.forEach(function(x, i){
  //   if (x['socket'] === socket){
  //     players.removePlayer(x['playerId']);
  //     clients.splice(i, 1);
  //     // when one client is disconnected, delete his score in this set of game
  //     // then emit to the client, force other client to update the newest scoreBoard
  //     currentScores.splice(i, 1);
  //     io.to(roomName).emit('updateScore', currentScores);
  //   }
  // });
  console.log('user disconnected');
}