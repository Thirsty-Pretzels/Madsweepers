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
      socket.emit('openSpace', [action.playerId, action.location]);
    }

    if ( action.type === 'GET-NEW-BOARD' ) {
      socket.emit('getNewBoard');
    }

    if ( action.type === 'CREATE-PLAYER' ) {
      socket.emit('createPlayer', action.payload);
    }

    if ( action.type === 'DROP-FLAG' ) {
      socket.emit('dropFlag', [action.playerId, action.location]);
    }

    return next(action);
  };
}

// define the initializing middleware function
// middleware that calls actions in actions/index.js and passes it data using socket connections
export default function(store) {
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