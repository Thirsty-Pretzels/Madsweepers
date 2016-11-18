var Bot = function() {
  var name = '';
  var score = 0;
  var id = '';
  var x = 0;
  var y = 0;
};

Bot.prototype.spawn = function(board){
  //assign random binary name, unique-ish ID, and x and y locations
  this.name = (Math.floor(Math.random() * 1000)).toString(2);
  this.id = (Math.floor(Math.random() * 10000000)).toString(36);
  this.x = Math.floor(Math.random() * board.length);
  this.y = Math.floor(Math.random() * board[0].length);
}

Bot.prototype.decide = function(board) {
  //is current tile unrevealed?  Do something!  Find relative danger from nearby revealed tiles
  if(board[this.x][this.y]['status'] === 0){
    var decision = 1;
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        if (i >= 0 && j >= 0 && i < board.length && j < board[0].length && board[i][j]['status'] !== 0 && board[i][j]['val'] !== 9 ) {
          decision *= (1 - (board[i][j]['val'] / 20));
        }
      }
    }
  }

  //Decide if bot should drop a flag or open tile, change score accordingly
  if (board[this.x][this.y]['val'] === 9) {
    if (Math.random() > decision) {
      board[this.x][this.y]['status'] = 2;
      this.score += 10;
    } else {
      board[this.x][this.y]['status'] = 1;
      this.score -= 10;
    }
  } else {
    if (Math.random() > decision) {
      board[this.x][this.y]['status'] = 2;
      this.score += 1;
    } else {
      board[this.x][this.y]['status'] = 3;
      this.score -= 5;
      setTimeout(function(){
        board[this.x][this.y]['status'] = 2;
      }, 300);
      this.score++;
    }
  }

  //move on to the next tile at random, add weight for unrevealed tiles
  var moves = [];
  if (this.x > 0) {
    moves.push([this.x - 1][this.y]);
    if (board[this.x - 1][this.y]['status'] === 0){
      moves.concat([this.x - 1][this.y],[this.x - 1][this.y],[this.x - 1][this.y]);
    }
  }
  if (this.x < board.length - 1) {
    moves.push([this.x + 1][this.y]);
    if (board[this.x + 1][this.y]['status'] === 0){
      moves.concat([this.x + 1][this.y],[this.x + 1][this.y],[this.x + 1][this.y]);
    }
  }
  if (this.y > 0) {
    moves.push([this.x][this.y - 1]);
    if (board[this.x][this.y - 1]['status'] === 0){
      moves.concat([this.x][this.y - 1],[this.x][this.y - 1],[this.x][this.y - 1]);
    }
  }
  if (this.y < board[0].length - 1) {
    moves.push([this.x][this.y + 1]);
    if (board[this.x][this.y + 1]['status'] === 0){
      moves.concat([this.x][this.y + 1],[this.x][this.y + 1],[this.x][this.y + 1]);
    }
  }

  //decide on a move, assign new location
  moves = moves[Math.floor(Math.random() * moves.length)];
  this.x = moves[0];
  this.y = moves[1];
}

module.exports = Bot;