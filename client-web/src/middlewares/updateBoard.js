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

    return next(action);
  };
}

// define the initializing middleware function
export default function(store) {
  socket.on('update', data => {
  	//when data is received from socket server, fire another action by store.dispatch
    store.dispatch(actions.updateLocation(data[1], 'ARROW'+data[0] , data[2], data[3]));
  });
}