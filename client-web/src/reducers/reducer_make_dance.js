export default function(state = 'player', action) {
  if ( action.type === 'MAKE-DANCE' ) {
    return 'player-dance';
  }

  if (action.type === 'END-DANCE') {
    return 'player';
  }

  return state;
}