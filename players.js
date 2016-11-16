var Players = function() {
  this.playerLocations = {};
  this.playerCount = 0;
};

Players.prototype.addPlayer = function(playerId) {

  if ( !this.playerLocations[playerId] ) {
      const newPlayer = this.createPlayer(playerId);
      this.playerLocations[playerId] = newPlayer;
      this.playerCount++;
      console.log(this.playerCount, this.playerLocations);
  } else {
    console.log('player already exist');
  }
};

Players.prototype.removePlayer = function(playerId) {
  console.log('deadifying player ' + playerId);
  delete this.playerLocations[playerId];
  this.playerCount--;
};

Players.prototype.createPlayer = function(playerId) {
  // body...
  return {
    status: 0,
    x: Math.floor( Math.random() * 10 ),
    y: Math.floor( Math.random() * 10 )
  };
};

Players.prototype.move = function(playerId, direction) {
  // body...
  switch(direction) {
    case 'UP':
      this.playerLocations[playerId].y--;
      break;
    case 'DOWN':
      this.playerLocations[playerId].y++;
      break;
    case 'LEFT':
      this.playerLocations[playerId].status = 1;
      this.playerLocations[playerId].x--;
      break;
    case 'RIGHT':
      this.playerLocations[playerId].status = 2;
      this.playerLocations[playerId].x++;
      break;
    default:
      break;
  }

  console.log(this.playerLocations);
};

module.exports = Players;

// Uncomment for example.
// randomPlayer = new Players;
// randomPlayer.addPlayer('newPlayer');
// randomPlayer.addPlayer('newPlayer');
// randomPlayer.addPlayer('newPlayer2');
// randomPlayer.move('newPlayer', 'UP');
// randomPlayer.move('newPlayer2', 'LEFT');
