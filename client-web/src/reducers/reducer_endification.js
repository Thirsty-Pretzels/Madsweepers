export default function(state=false, action) {
  if ( action.type === 'END-GAME' ) {
    console.log('game should end');
    return action.payload;
  };

  return state;
}