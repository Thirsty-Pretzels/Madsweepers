export default function( state = [], action ) {

  if ( action.type === 'END-GAME' ) {
    return action.gameResult;
  }

  return state;
}