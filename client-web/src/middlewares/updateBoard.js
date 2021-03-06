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

    if (action.type === 'CREATE-NEW-ROOM') {
      socket.emit('createNewRoom', {roomName: action.roomName, row: action.row, col: action.col, mineDensity: action.mineDensity})
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

    if ( action.type === 'FIRE-BULLET' ) {
      socket.emit('shoot', action.payload);
    }

    if ( action.type === 'DROP-FLAG' ) {
      socket.emit('dropFlag', [action.playerId, action.location]);
    }

    if ( action.type === 'STUN' ) {
      socket.emit('getStun');
    }

    if ( action.type === 'BANANA-OUT' ) {
      socket.emit('bananaOut', action.payload);
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

  socket.on('roomInfoUpdate', info => {
    store.dispatch(actions.updateRoomInfo(info));
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
    if ( isAllPlayersReady ) {
      store.dispatch(actions.endification(false));
      store.dispatch(actions.updateBanana({type: 'REMOVE-ALL-BANANA'}));
      store.dispatch(actions.removeAllBullet());
    }
  });

  socket.on('updatePlayerLocations', ({newLocations, boardSize}) => {
  	//when data is received from socket server, fire another action by store.dispatch
    store.dispatch(actions.updateLocation(newLocations, boardSize));
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

  socket.on('endification', (gameResult) => {
    store.dispatch(actions.endification(true, gameResult));
  });

  socket.on('updateGameTime', (gameTime) => {
    store.dispatch(actions.updateGameTime(gameTime));
  });

  socket.on('bulletOut', (newBullet, id) => {
    store.dispatch(actions.addBullet(newBullet, id));
  });

  socket.on('updateLoot', loot => {
    store.dispatch(actions.updateLoot(loot));
  });

  socket.on('bananaPlaced', location => {
    const type = 'ADD-BANANA';
    store.dispatch(actions.updateBanana({type, location}));
  });

  socket.on('bananaUsed', location => {
    const type = 'REMOVE-BANANA';
    store.dispatch(actions.updateBanana({type, location}));
  });

  socket.on('danceParty', (status, boardSize) => {
    store.dispatch(actions.updateLocation(status, boardSize));
  });

  socket.on('broadcast', (message) => {
    store.dispatch(actions.broadcast(message));
    setTimeout(() => {
      store.dispatch(actions.checkOutdatedMessage());
    }, 3000);
  });

  socket.on('directToMainPage', () => {
    store.dispatch(actions.directToMainPage(true));
  });
}