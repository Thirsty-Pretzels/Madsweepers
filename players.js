var Players = function() {
  this.playerLocations = {};
  this.playerCount = 0;
};

Players.prototype.addPlayer = function(playerId) {

  if ( !this.playerLocations[playerId] ) {
      const newPlayer = this.createPlayer(playerId);
      this.playerLocations[playerId] = newPlayer;
      this.playerCount++;
  } else {
    console.log('player already exist');
  }
};

Players.prototype.removePlayer = function(playerId) {
  console.log('deadifying player ' + playerId);
  if (this.playerLocations[playerId]){
    delete this.playerLocations[playerId];
    this.playerCount--;
  }
};

Players.prototype.createPlayer = function(playerId) {
  // body...
  return {
    ready: false,
    status: 0,
    x: Math.floor( Math.random() * 10 ),
    y: Math.floor( Math.random() * 10 )
  };
};

Players.prototype.move = function(playerId, direction, boardSize) {
  if (direction === 'UP' && this.playerLocations[playerId].y > 0) {
    this.playerLocations[playerId].y--;
  }
  if (direction === 'DOWN' && this.playerLocations[playerId].y < boardSize[1] - 1){
    this.playerLocations[playerId].y++;
  }
  if (direction === 'LEFT' && this.playerLocations[playerId].x > 0) {
    this.playerLocations[playerId].status = 1;
    this.playerLocations[playerId].x--;
  }
  if (direction === 'RIGHT' && this.playerLocations[playerId].x < boardSize[0] - 1){
      this.playerLocations[playerId].status = 2;
      this.playerLocations[playerId].x++;
  }

  console.log(this.playerLocations);
};

Players.prototype.resetDirectionStatus = function(playerId) {
  this.playerLocations[playerId].status = 0;
};

Players.prototype.listPlayers = function() {
  return Object.keys(this.playerLocations);
};

module.exports = Players;

// Uncomment for example.
// randomPlayer = new Players;
// randomPlayer.addPlayer('newPlayer');
// randomPlayer.addPlayer('newPlayer');
// randomPlayer.addPlayer('newPlayer2');
// randomPlayer.move('newPlayer', 'UP');
// randomPlayer.move('newPlayer2', 'LEFT');
