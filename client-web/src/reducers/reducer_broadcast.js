export default function(state = { message: '', date: Date.now(), refresh: false}, action) {
  var newState;
  if ( action.type === 'BROADCAST' ) {
    newState = {
      message: action.message,
      date: action.date,
      refresh: true
    }
    return newState;
  }

  if (action.type === 'CHECK-OUTDATED-MESSAGE') {
  	if (action.date - state.date > 2800) {
  		newState = {
  			message: '',
  			date: action.date,
  			refresh: false
  		}
  		return newState;
  	}
  	return state;
  }

  if (action.type === 'END-GAME') {
  	newState = {
  		message: '',
  		date: Date.now(),
  		refresh: false
  	}

  	return newState;
  }

  return state;
}