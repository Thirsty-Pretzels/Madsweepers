var Board = function () {
  this.board = [];
  this.todos = 0;
}

//generate a random board, takes two arguments for x and y dimensions and an optional danger factor
Board.prototype.generate = function (n, m, d) {
  if (d === undefined || d > .9 || d < 0) {
    d = d ? d : .175
  }
  var mines = Math.ceil(n * m * d);
  this.todos = n * m - mines;  //total number of non-mine tiles to uncover
  this.board = [];
  this.minesLeft = mines;

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
  // uncomment to log stringified board to console:
  // console.log(JSON.stringify(this.board));

  // uncomment to log board values to the console on generation:
  // console.log(this.board.reduce(function(a, c){ return a.concat([c.reduce(function(b, d){ return b.concat(d['val'])}, [])]) }, []));
}

//reveal a tile
Board.prototype.uncover = function(x, y) {
  if (this.board[x][y]['revealed'] === false) {
    this.board[x][y]['revealed'] = true;
    this.todos--;
  }
  if (this.board[x][y]['val'] === 9){
    this.minesLeft --;
  }
  return this.board[x][y]['val'];
}

Board.prototype.explode = function(x, y){
  this.board[x][y]['status'] = 4;
  this.board[x][y]['flaggedBy'] = null;
  this.board[x][y]['surface'] = null;
  for (var i = -1; i < 2; i++){
    for (var j = -1; j < 2; j++){
      if (x + i >= 0 && x + i < this.board.length && y + j >= 0 && y + j < this.board[0].length){
        this.board[x+i][y+j]['surface'] = null;
      }
    }
  }
}

//generate loot on board
Board.prototype.loot = function(x, y) {
  var items = [{name: 'banana'}, {name: 'shield'}, {name: 'cannon'}];
  this.board[x][y]['surface'] = items[Math.floor(Math.random * items.length)];
}

//flag a mine
Board.prototype.flag = function(x, y, name){
  if (this.board[x][y]['flaggedBy'] === null){
    this.board[x][y]['flaggedBy'] = name;
    this.board[x][y]['status'] = 1;
  }
  if (this.board[x][y]['val'] === 9) {
    this.minesLeft --;
  }
}

//unflag a mine, can only be performed by person who originally flagged.
Board.prototype.unflag = function(x, y, name){
  if (this.board[x][y]['flaggedBy'] === name) {
    this.board[x][y]['flaggedBy'] = null;
    this.board[x][y]['status'] = 0;
  }
}

//remove loot from board
Board.prototype.unloot = function(x, y, loot){
  var temp = this.board[x][y]['surface'];
  this.board[x][y]['surface'] = null;
  return temp;
}

Board.prototype.tileVal = function(x, y){
  return this.board[x][y]['val'];
}

//get tallies for flagged mines
Board.prototype.tally = function(){
  var tallies = {};
  var name;
  var err = 0;
  for (var i = 0; i < this.board.length; i++){
    for (var j = 0; j < this.board[i].length; j++){
      name = this.board[i][j]['flaggedBy'];
      if (this.board[i][j]['val'] === 9 && name !== null){
        tallies[name] = tallies.hasOwnProperty(name) ? tallies[name] + 1 : 1;
      }
      if (this.board[i][j]['revealed'] === false && this.board[i][j]['val'] !== 9){
        err ++;
      }
    }
  }
  if (err) {
    this.todos = err;
    return err
  }
  return tallies;
}

// uncomment to generate a sample board on startup
// var hjk = new Board();
// hjk.generate(30, 30, .2);
// hjk.flag(12, 12, 'heyooo');
// console.log(hjk);

module.exports = Board;