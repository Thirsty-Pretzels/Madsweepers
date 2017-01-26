// helper function for dropFlagHandler and openSpaceHandler
// update the score of a specific user in the currrentScores when there is change;
module.exports = function(currentScores, scoreChange, io, roomName, gameManager) {
  for(var i = 0; i < currentScores.length; i++) {
  	if (currentScores[i].id === scoreChange.id) {
      console.log('current scores: ', currentScores)
  	  currentScores[i].scoreChange += scoreChange.scoreChange;
  	  break;
  	}
  }
}