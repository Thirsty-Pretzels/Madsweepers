// hard coded as a fallback if db is not connected
var topPlayers = ["minehannnn", "99", "Yo_wassup", "90", "thisisMJ", "45", "timzeng", "40", "angrybird", "36"];

export default function(state = topPlayers, action) {
  if ( action.type === 'UPDATE-HIGH-SCORE' ) {
    return action.highScores;
  }

  return state;
}