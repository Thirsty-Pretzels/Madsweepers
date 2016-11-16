import * as actions from '../actions/index';
// I actually don't know why we need to input actions in this way
// but I am pretty sure that (import actions from '../actions/index') won't work
// commented added by Bruce

// define boardMiddleware
export function boardMiddleware(store) {
  return next => action => {
    if (action.type === 'LOGIN-TEMP-USER') {
      socket.emit('loginTempUser', action.payload);
    }

    if (action.type === 'ENTER-ROOM') {
      socket.emit('enterRoom', {room: action.room, user: action.user, inRoom: action.inRoom, inRoomname: action.inRoomname});
    }

    if (action.type === 'LEAVE-ROOM') {
      socket.emit('leaveRoom', {room: action.room, user: action.user});
    }

    if (action.type === 'TOGGLE-READY') {
      socket.emit('toggleReady', {room: action.room ,user: action.user});
    }

    //when action.type is UP, DOWN, LEFT, RIGHT, socket.emit will be fired
    if ( action.type === 'UP' || action.type === 'DOWN' || action.type === 'LEFT' || action.type === 'RIGHT' ) {
      socket.emit('movePlayer', [action.payload, action.type]);
    }

    if ( action.type === 'OPEN-SPACE' ) {
      socket.emit('openSpace', [action.playerId, action.location]);
    }

    if ( action.type === 'GET-NEW-BOARD' ) {
      socket.emit('getNewBoard');
    }

    // if ( action.type === 'CREATE-PLAYER' ) {
    //   socket.emit('createPlayer', action.payload, action.roomName);
    // }

    if ( action.type === 'DROP-FLAG' ) {
      socket.emit('dropFlag', [action.playerId, action.location]);
    }

    return next(action);
  };
}

// define the initializing middleware function
// middleware that calls actions in actions/index.js and passes it data using socket connections
export default function(store) {
  socket.on('newTempUser', userInfo => {
    store.dispatch(actions.newUser(userInfo));
  });

  socket.on('roomListUpdate', rooms => {
    store.dispatch(actions.updateRoomList(rooms));
  });

  socket.on('hasEnteredRoom', room => {
    store.dispatch(actions.hasEnteredRoom(room));
  });

  socket.on('hasLeftRoom', room => {
    store.dispatch(actions.hasLeftRoom(room));
  });

  socket.on('hasToggledReady', (info) => {
    store.dispatch(actions.hasToggledReady());
  });

  socket.on('allPlayersReady', (isAllPlayersReady) => {
    store.dispatch(actions.allReady(isAllPlayersReady));
  });

  socket.on('updatePlayerLocations', newLocations => {
  	//when data is received from socket server, fire another action by store.dispatch
    store.dispatch(actions.updateLocation(newLocations));
  });

  socket.on('updateBoard', newBoard => {
    store.dispatch(actions.updateBoard(newBoard));
  });

  socket.on('updateScore', scoreChange => {
    //update score panel when new score is received
    store.dispatch(actions.updateScore(scoreChange));
  });

  socket.on('countMines', minesInfo => {
    store.dispatch(actions.countMines(minesInfo));
  });
}