export default function(state = {host: null, userList: {}}, action) {
  if ( action.type === 'ROOM-INFO-UPDATE' ) {
    return action.payload;
  }

  return state;
}