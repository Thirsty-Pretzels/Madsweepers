// helper function for dropFlagHandler and openSpaceHandler
// update the score of a specific user in the currrentScores when there is change;
module.exports = function(currentScores, scoreChange, io, roomName, gameManger) {
  for(var i = 0; i < currentScores.length; i++) {
  	if (currentScores[i].id === scoreChange.id) {
      console.log('current scores: ', currentScores)
  	  currentScores[i].scoreChange += scoreChange.scoreChange;
      if (currentScores[i].scoreChange >= 100){
        console.log('max score reached')
        gameManger.endGame(roomName);
        io.to(roomName).emit('endification', gameManger.endGame(roomName));
      }
  	  break;
  	}
  }
}