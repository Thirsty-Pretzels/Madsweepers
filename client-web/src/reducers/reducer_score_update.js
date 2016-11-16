export default function(state = [], action) {
  if (action.type === 'UPDATE-SCORE') {
    // state is only readable. Thus, can't revise state directly. Must generate a new State and revise this state;
    var newState = [];

    if (Array.isArray(action.scoreChange)) {
      // if action.scoreChange is array, it means that one new player just joined the game 
      for (let entry of action.scoreChange) {
        newState.push({id: entry.id, score: entry.scoreChange});
      }
    } else {
      // if action.scoreChange is not array, it means there is an update for an existing user
      newState = state.slice();
      
      for (var i = 0; i < newState.length; i++) {
        if (newState[i].id === action.scoreChange.id) {
          newState[i].score += action.scoreChange.scoreChange;
          break;
        }
      }
    }

  	return newState;
  
  } else {
  	return state;
  }
}