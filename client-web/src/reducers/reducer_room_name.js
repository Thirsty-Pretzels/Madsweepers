export default function(state = 'roomName', action) {
  if ( action.type === 'UPDATE_ROOMNAME' ) {
    return action.payload;
  }

  return state;
}