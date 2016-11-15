export default function(state = [], action) {
  if (action.type === 'UPDATE-SCORE') {
  	// state is only readable. Thus, can't revise state directly. Must generate a new State and revise this state;
  	var newState = state.slice();
    var foundUser = false;        //marker: if the action.scoreChange.id can be found in the state, set as true; or else default to be false;
  	
    for (var i = 0; i < newState.length; i++) {
  	  if (newState[i].id === action.scoreChange.id) {
  	  	newState[i].score += action.scoreChange.scoreChange;
  	  	foundUser = true;
        break;
  	  }
  	}
    // if user can't be found in the state list, create a corresponding record in newState for it by pushing into newState;
    if (!foundUser) {
      newState.push({id: action.scoreChange.id, score: action.scoreChange.scoreChange});
    }

  	return newState;
  
  } else {
  	return state;
  }
}