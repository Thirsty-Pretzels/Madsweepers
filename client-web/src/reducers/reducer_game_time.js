export default function( state=0, action ) {

  if ( action.type === 'UPDATE-GAME-TIME' ) {
    return action.payload;
  }

  return state;
}