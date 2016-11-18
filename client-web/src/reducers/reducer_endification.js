export default function(state=false, action) {
  if ( action.type === 'END-GAME' ) {
    return action.payload;
  };

  return state;
}