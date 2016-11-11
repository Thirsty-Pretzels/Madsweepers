var Board = function () {
  this.board = [];
}

//generate a random board, takes two arguments for x and y dimensions
Board.prototype.generate = function (n, m) {
  var mines = n * m * .2;
  this.board = [];

  //generate empty board
  for (var i = 0; i < n; i++){
    this.board.push([]);
    for (var j = 0; j < m; j++){
      this.board[i].push({'val': 0, 'status': 0, 'flaggedBy': null, 'surface': null});
    }
  }

  //populate board with mines
  for (var i = 0; i < mines; i++){
    var x = Math.floor(Math.random() * n);
    var y = Math.floor(Math.random() * m);
    if (this.board[x][y]['val'] === 9) {
      i--;
    } else {
      this.board[x][y]['val'] = 9;
    }
  }

  //generate number values for tiles adjacent to mines
  for (var i = 0; i < n; i++){
    for (var j = 0; j < m; j++){
      var count = 0;
      if (this.board[i][j]['val'] !== 9){
        for (var x = -1; x < 2; x++) {
          for (var y = -1; y < 2; y++) {
            if (i + x >= 0 && j + y >= 0 && i + x < n && j + y < m && this.board[i+x][j+y]['val'] === 9){
              count++;
            }
          }
        }
        this.board[i][j]['val'] = count;
      }
    }
  }
  // uncomment to log board to console:
  // console.log(JSON.stringify(this.board));

  // uncomment to log board values to the console on generation:
  // console.log(this.board.reduce(function(a, c){ return a.concat([c.reduce(function(b, d){ return b.concat(d['val'])}, [])]) }, []));
}

Board.prototype.uncover = function(point) {
  this.board[point[0]][point[1]]['revealed'] = true;
}
// var hjk = new Board();
// hjk.generate(10, 10);
module.exports = Board;