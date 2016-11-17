var topScores = [
  {
    name: 'John',
    score: 105
  }, 
  { 
    name: 'Mary',
    score: 99
  }, 
  { 
    name: 'Jane',
    score: 80
  }
  ] //hard-coded for now


export default function(state = topScores, action) {
  if ( action.type === 'UPDATE_TOPSCORES' ) {
    return action.payload;
  }

  return state;
}