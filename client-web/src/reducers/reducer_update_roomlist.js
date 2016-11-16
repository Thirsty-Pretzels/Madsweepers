export default function(state = [], action) {
  if ( action.type === 'ROOM-LIST-UPDATE' ) {
    return action.payload;
  }

  return state;
}