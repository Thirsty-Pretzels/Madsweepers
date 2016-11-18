var defaultState = {
  username: '', 
  tempUniqUserId: '', 
  status: false, 
  userCode: 1, 
  room: '', 
  inRoom: false, 
  isReady: false,
  showCreatePanel: false
};

export default function(state = defaultState, action) {
  var newState = Object.assign({}, state);
  if (action.type === 'NEW-USER') {
  	newState.status = action.payload.status;
    newState.username = action.payload.username;
    newState.tempUniqUserId = action.payload.tempUniqUserId;
    newState.userCode = action.payload.userCode;

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
  } else if (action.type === 'TOGGLE-CREATE-ROOM-PANEL') {
    newState.showCreatePanel = !state.showCreatePanel;

    return newState
  }

  return state;
}