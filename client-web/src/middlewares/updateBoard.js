import * as actions from '../actions/index';
export function boardMiddleware(store) {
  return next => action => {
    console.log('key pressed');
    if (action.type === 'UP' || action.type === 'DOWN' || action.type === 'LEFT' || action.type === 'RIGHT') {
      socket.emit('movePlayer', [action.type, action.playerId , action.payload, action.board]);
    }

    return next(action);
  };
}

export default function(store) {
  socket.on('update', data => {
  	console.log('receive data');
    store.dispatch(actions.updateLocation(data[1], 'ARROW'+data[0] , data[2], data[3]));
  });
}