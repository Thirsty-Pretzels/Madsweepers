// socket helper function: open space
var updateCurrentScores = require('./updateCurrentScores.js');

module.exports = function(io, socket, clients, roomName, board, currentScores, data, gameManager) {
	var playerId = data[0];
  var location = data[1];

  if (board.board[location.y][location.x].status === 0) {
    board.board[location.y][location.x].status = 2;
    //update the score according to the result;
    if(board.board[location.y][location.x].val === 9) {
      // update currentScores then emit the change
      gameManager.addRecordEntry(roomName, 'StepOnMine', clients[socket.id]['user']);
      updateCurrentScores(currentScores, {id: playerId, scoreChange: scoreRevealMine}, io, roomName, gameManager);
      io.to(roomName).emit('updateScore', {id: playerId, scoreChange: scoreRevealMine});
      board.minesLeft--;
      io.to(roomName).emit('countMines', [board.minesLeft, board.minesCount]);
    } else {
      // update currentScores then emit the change
      gameManager.addRecordEntry(roomName, 'OpenSpace', clients[socket.id]['user']);
      updateCurrentScores(currentScores, {id: playerId, scoreChange: scoreRevealspace}, io, roomName, gameManager);
      io.to(roomName).emit('updateScore', {id: playerId, scoreChange: scoreRevealspace});
      board.todos--;
    }
    if (board.minesLeft === 0){
      board.generate(20, 30);
      setTimeout(function(){
        io.to(roomName).emit('updateBoard', {type: 0, board: board.board});
      }, 300);
    }

    // only send the change of the board, make sure it's type 1
    io.to(roomName).emit('updateBoard', {type: 1, locationX: location.x, locationY: location.y, status: 2});
  }
}