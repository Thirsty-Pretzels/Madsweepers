// socket helper function: when a player gets disconnected
module.exports = function(players, clients) {
  clients.forEach(function(x, i){
    if (x['socket'] === socket){
      players.removePlayer(x['playerId']);
      clients.splice(i, 1);
    }
  });
  console.log('user disconnected');
}