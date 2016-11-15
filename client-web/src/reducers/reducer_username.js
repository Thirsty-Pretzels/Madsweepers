export default function(state = 'username', action) {
  if ( action.type === 'UPDATE_USERNAME' ) {
    return action.payload;
  }

  return state;
}