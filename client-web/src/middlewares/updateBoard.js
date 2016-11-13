import * as actions from '../actions/index';
// I actually don't know why we need to input actions in this way
// but I am pretty sure that (import actions from '../actions/index') won't work
// commented added by Bruce

// define boardMiddleware
export function boardMiddleware(store) {
  return next => action => {
    //when action.type is UP, DOWN, LEFT, RIGHT, socket.emit will be fired
    if (action.type === 'UP' || action.type === 'DOWN' || action.type === 'LEFT' || action.type === 'RIGHT') {
      socket.emit('movePlayer', [action.type, action.playerId , action.payload, action.board]);
    }

    if (action.type === 'OPEN-SPACE') {
      socket.emit('OPEN-SPACE', [action.playerId, action.location, action.payload]);
    }

    if (action.type === 'GET-NEW-BOARD') {
      console.log('inside GET-NEW-BOARD middleware');
      socket.emit('GET-NEW-BOARD');
    }

    return next(action);
  };
}

// define the initializing middleware function
export default function(store) {
  socket.on('update', data => {
  	//when data is received from socket server, fire another action by store.dispatch
    store.dispatch(actions.updateLocation(data[1], 'ARROW'+data[0] , data[2], data[3]));
  });

  socket.on('updateBoard', newBoard => {
    store.dispatch(actions.updateBoard(newBoard));
  });
}