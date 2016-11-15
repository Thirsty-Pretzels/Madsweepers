// socket helper function: when a player gets disconnected
module.exports = function(io, players, currentScores, clients, socket) {
  clients.forEach(function(x, i){
    if (x['socket'] === socket){
      players.removePlayer(x['playerId']);
      clients.splice(i, 1);
      // when one client is disconnected, delete his score in this set of game
      // then emit to the client, force other client to update the newest scoreBoard
      currentScores.splice(i, 1);
      io.emit('updateScore', currentScores);
    }
  });
  console.log('user disconnected');
}