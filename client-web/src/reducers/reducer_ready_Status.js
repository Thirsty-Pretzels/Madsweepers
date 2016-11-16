export default function(state = false, action) {
  if ( action.type === 'ALL-READY' ) {
    console.log('inside reducer: ', action.ready);
    return action.ready;
  }

  return state;
}