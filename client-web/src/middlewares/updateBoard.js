import actions from '../actions/index';
export function boardMiddleware(store) {
  console.log('I am here.');
  return next => action => {
    if (action.type === 'UP' || action.type === 'DOWN' || action.type === 'LEFT' || action.type === 'RIGHT') {
      socket.emit('movePlayer', [action.type, action.playerId , action.payload, action.board]);
    }

    return next(action);
  };
}

export default function(store) {
  socket.on('update', data => {
    store.dispatch(actions.movePlayer(data[1], 'ARROW'+data[0] , data[2], data[3]));
  });
}