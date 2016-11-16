// socket helper function: drop flag
var updateCurrentScores = require('./updateCurrentScores.js');

module.exports = function(io, roomName, board, currentScores, data) {
  var playerId = data[0];
  var location = data[1];

  if ( board.board[location.y][location.x].status === 0 ) {
    // if the flag is dropped at a correct place
    if ( board.board[location.y][location.x].val === 9 ) {
      board.board[location.y][location.x].status = 1;
      //update board
      board.minesLeft--;
      io.to(roomName).emit('countMines', [board.minesLeft, board.minesCount]);
      // only send the change of the board, make sure it's type 1
      io.to(roomName).emit('updateBoard', {type: 1, locationX: location.x, locationY: location.y, status: 1});
      // update currentScores then emit the change
      updateCurrentScores(currentScores, {id: playerId, scoreChange: scoreRightFlag});
      io.to(roomName).emit('updateScore', {id: playerId, scoreChange: scoreRightFlag});
    } else {
    // if the flag is dropped at a wrong place
      board.board[location.y][location.x].status = 3;
      // only send the change of the board, make sure it's type 1
      io.to(roomName).emit('updateBoard', {type: 1, locationX: location.x, locationY: location.y, status: 3});
      // update currentScores then emit the change
      updateCurrentScores(currentScores, {id: playerId, scoreChange: scoreWrongFlag});
      io.to(roomName).emit('updateScore', {id: playerId, scoreChange: scoreWrongFlag});
      //after 0.3, reset the corresponing grid to initial
      setTimeout(() => {
        board.board[location.y][location.x].status = 0;
        // only send the change of the board, make sure it's type 1
        io.to(roomName).emit('updateBoard', {type: 1, locationX: location.x, locationY: location.y, status: 0});
      }, 300);
    }
    if (board.minesLeft === 0){
      board.generate();
      setTimeout(function(){
        io.to(roomName).emit('updateBoard', {type: 0, board: board.board});
      }, 300);
    }
  }
};