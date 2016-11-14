import * as actions from '../actions/index';
// I actually don't know why we need to input actions in this way
// but I am pretty sure that (import actions from '../actions/index') won't work
// commented added by Bruce

// define boardMiddleware
export function boardMiddleware(store) {
  return next => action => {
    //when action.type is UP, DOWN, LEFT, RIGHT, socket.emit will be fired
    if ( action.type === 'UP' || action.type === 'DOWN' || action.type === 'LEFT' || action.type === 'RIGHT' ) {
      socket.emit('movePlayer', [action.payload, action.type]);
    }

    if ( action.type === 'OPEN-SPACE' ) {
      socket.emit('OPEN-SPACE', [action.playerId, action.location]);
    }

    if ( action.type === 'GET-NEW-BOARD' ) {
      socket.emit('GET-NEW-BOARD');
    }

    if ( action.type === 'CREATE-PLAYER' ) {
      socket.emit('CREATE-PLAYER', action.payload);
    }

    if ( action.type === 'DROP-FLAG' ) {
      socket.emit('DROP-FLAG', [action.playerId, action.location]);
    }

    return next(action);
  };
}

// define the initializing middleware function
export default function(store) {
  socket.on('updatePlayerLocations', newLocations => {
  	//when data is received from socket server, fire another action by store.dispatch
    console.log('received newLocations => ', newLocations);
    store.dispatch(actions.updateLocation(newLocations));
  });

  socket.on('updateBoard', newBoard => {
    store.dispatch(actions.updateBoard(newBoard));
  });

  socket.on('updateScore', scoreChange => {
    //update score panel when new score is received
    store.dispatch(actions.updateScore(scoreChange));
  });
}