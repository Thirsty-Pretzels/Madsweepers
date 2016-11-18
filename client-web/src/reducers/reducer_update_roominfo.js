export default function(state = {host: null, userList: {}}, action) {
  if ( action.type === 'ROOM-INFO-UPDATE' ) {
    console.log('inside room-info-update reducer: ', action.payload);
    return action.payload;
  }

  return state;
}