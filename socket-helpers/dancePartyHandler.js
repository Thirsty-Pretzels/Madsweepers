module.exports = function(io, socket, gameManager, roomName, myUserName, users, clients) {
  // object containing username, location, status
<<<<<<< 4dc8a12931c80aeefacca2c1bd8d57b7cdc48324
=======
  console.log('in dance party handler');
>>>>>>> Add dance party icon in loot

  if (clients[socket.id]['loot']['party'] > 0){
    clients[socket.id]['loot']['party']--;
    io.to(socket.id).emit('updateLoot', clients[socket.id]['loot']);
    var status = gameManager.rooms[roomName].players.playerLocations;

    // change status of other players to 5, which makes them dance on the client
    for (var user in status) {
      if (user !== myUserName) {
        status[user].status = 5;
      }
    }
    const boardSize = [gameManager.rooms[roomName].board.board[0].length, gameManager.rooms[roomName].board.board.length];
    io.to(roomName).emit('danceParty', status, boardSize);

    // get username of all players for the room we are in;
    var players =  Object.keys(status);

    // stun all other players except yourself
    players.forEach((user) => {
    // users object contains data by username
      var socketId = users[user].socket;
      if (socketId !== socket.id) {
        clients[socketId]['stun'] = true;
        setTimeout(function(){
          clients[socketId]['stun'] = false;
        }, 5000);
      }
    });
  }
}