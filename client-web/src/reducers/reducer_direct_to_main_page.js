export default function(state=false, action) {
  if ( action.type === 'DIRECT-TO-MAIN-PAGE' ) {
    return action.payload;
  }

  return false;
}