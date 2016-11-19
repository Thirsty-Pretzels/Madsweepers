export default function(state = false, action) {
  if ( action.type === 'ALL-READY' ) {
    return action.ready;
  }

  return state;
}