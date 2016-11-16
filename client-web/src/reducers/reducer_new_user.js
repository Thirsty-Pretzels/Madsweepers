export default function(state = {username: '', tempUniqUserId: '', status: false, room: '', inRoom: false, isReady: false}, action) {
  var newState = Object.assign({}, state);
  if (action.type === 'NEW-USER') {
  	newState.status = action.payload.status;
    newState.username = action.payload.username;
    newState.tempUniqUserId = action.payload.tempUniqUserId;

    return newState;
  } else if (action.type === 'ENTERED-ROOM') {
  	newState.room = action.room;
  	newState.inRoom = true;
    newState.isReady = false;

  	return newState; 
  } else if (action.type === 'LEFT-ROOM') {
  	newState.room = '';
  	newState.inRoom = false;
    newState.isReady = false;

  	return newState;
  } else if (action.type === 'TOGGLED-READY') {
    newState.isReady = !state.isReady;

    return newState;
  }
  return state;
}