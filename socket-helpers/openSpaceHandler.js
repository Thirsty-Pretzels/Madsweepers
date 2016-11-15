// socket helper function: open space
module.exports = function(io, board, data) {
	var playerId = data[0];
  var location = data[1];

  if (board.board[location.y][location.x].status === 0) {
    board.board[location.y][location.x].status = 2;
    //update the score according to the result;
    if(board.board[location.y][location.x].val === 9) {
      io.emit('updateScore', {id: playerId, scoreChange: scoreRevealMine});
      board.minesLeft--;
      console.log('mines left: ', board.minesLeft);
    } else {
      io.emit('updateScore', {id: 'player'+playerId, scoreChange: scoreRevealspace});
      board.todos--;
    }
    if (board.minesLeft === 0){
      board.generate();
      setTimeout(function(){
        io.emit('updateBoard', board.board);
      }, 300);
    }
  }
  io.emit('updateBoard', board.board);
}


