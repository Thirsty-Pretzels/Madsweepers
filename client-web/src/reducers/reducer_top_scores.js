
export default function(state = ["Test", 100], action) {
  if ( action.type === 'UPDATE-HIGH-SCORE' ) {
    return action.highScores;
  }

  return state;
}