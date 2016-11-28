export default function(state, action) {
  if ( action.type === 'DIRECT-TO-MAIN-PAGE' ) {
    return true;
  }

  return false;
}