export default function(state = [ {id: 'player1', score: 0}, {id: 'player2', score: 0}, {id: 'player3', score: 0} ], action) {
  if (action.type === 'UPDATE-SCORE') {
  	// state is only readable. Thus, can't revise state directly. Must generate a new State and revise this state;
  	var newState = state.slice();

  	for (var i = 0; i < newState.length; i++) {
  	  if (newState[i].id === action.scoreChange.id) {
  	  	newState[i].score += action.scoreChange.scoreChange;
  	  	break;
  	  }
  	}

  	return newState;
  
  } else {
  	return state;
  }
}