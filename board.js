var Board = function () {
  this.board = [];
  this.todos = 0;
}

//generate a random board, takes two arguments for x and y dimensions and an optional danger factor
Board.prototype.generate = function (n, m, d, timeStamp) {
  timeStamp = timeStamp ? timeStamp : Date.now();
  n = n ? n : 12;
  m = m ? m : 12;
  if (d === undefined || d > .9 || d < 0) {
    d = d ? d : .2
  }
  var mines = Math.ceil(n * m * d);
  this.todos = n * m - mines;  //total number of non-mine tiles to uncover
  this.board = [];
  this.minesCount = mines;   //add total mine count info
  this.minesLeft = mines;
  this.time = timeStamp;

  //generate empty board
  for (var i = 0; i < n; i++){
    this.board.push([]);
    for (var j = 0; j < m; j++){
      this.board[i].push({'val': 0, 'status': 0, 'surface': {banana: false}});
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
Board.prototype.uncover = function(data, io, roomName, gameManager) {
  var score = 0;
  //set tile status to 2, check if mine, return appropriate score change
  if(this.board[data[1].y][data[1].x]['status'] === 0){
    this.board[data[1].y][data[1].x]['status'] = 2;
    if (this.board[data[1].y][data[1].x]['val'] === 9){
      this.minesLeft --;
      score = scoreRevealMine;
      gameManager.addRecordEntry(roomName, 'StepOnMine', data[0]);
    } else {
      score = scoreRevealspace;
      gameManager.addRecordEntry(roomName, 'OpenSpace', data[0]);
    }
    if (this.minesLeft === 0){
      this.generate(this.board.length, this.board[0].length);
      setTimeout(function(){
        io.to(roomName).emit('updateBoard', {type: 0, board: this.board});
      }, 300);
    }
  }
  io.to(roomName).emit('updateBoard', {type: 1, locationX: data[1].x, locationY: data[1].y, status: 2});
  return score;
}

//flag a mine
Board.prototype.flag = function(data, io, roomName, gameManager, client) {
  var score = 0;
  var loc = data[1];
  var status = 0;
  var loot = [['ammo', 5], ['shield', 1, 'ammo', 2], ['shield', 1], ['banana', 2], ['party', 1]];
  if (this.board[loc.y][loc.x]['status'] !== 0){
    return 0;
  }
  if (this.board[loc.y][loc.x]['val'] === 9) {
    this.minesLeft --;
    score = scoreRightFlag;
    status = 1;
    this.board[loc.y][loc.x]['status'] = 1;

    if (Math.random() > .5 && Date.now() - client['wrongFlag'] > 1000){
      loot = loot[Math.floor(Math.random() * loot.length)];
      for (var i = 0; i < loot.length; i += 2){
        client['loot'][loot[i]] += loot[i + 1];
      }
      gameManager.addRecordEntry(roomName, 'FlagRight', data[0]);
      io.to(client.id).emit('updateLoot', client['loot']);
    }

  } else {
    client['wrongFlag'] = Date.now();
     gameManager.addRecordEntry(roomName, 'FlagWrong', data[0]);
    score = scoreWrongFlag;
    this.board[loc.y][loc.x]['status'] = 3;
    status = 3;

    setTimeout(()=>{
      this.board[loc.y][loc.x]['status'] = 0;
      io.to(roomName).emit('updateBoard', {'type': 1, 'locationX': data[1].x, 'locationY': data[1].y, 'status': 0});
    }, 300)
  }
  io.to(roomName).emit('updateBoard', {'type': 1, 'locationX': data[1].x, 'locationY': data[1].y, 'status': status});
  return score;
}

Board.prototype.placeBanana = function(x, y) {
  if (this.board[y][x]['surface']['banana'] === false) {
    this.board[y][x]['surface']['banana'] = true;
    return true;
  }
  return false;
}

Board.prototype.removeBanana = function(x, y) {
  console.log('removing', x, y)
  this.board[y][x]['surface']['banana'] = false;
}

// uncomment to generate a sample board on startup
// var hjk = new Board();
// hjk.generate(30, 30, .2);
// hjk.flag(12, 12, 'heyooo');
// console.log(JSON.stringify(hjk.board));

module.exports = Board;