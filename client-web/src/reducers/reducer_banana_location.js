export default function(state=[], action) {
  if ( action.type === 'ADD-BANANA' ) {
    var newSate = state.slice();
    newSate.push(action.payload);
    return newSate;
  }

  if ( action.type === 'REMOVE-BANANA' ) {
    var newSate = state.filter(banana => banana.x !== action.payload.x && banana.y !== action.payload.y);
    return newSate;
  }

  if ( action.type === 'REMOVE-ALL-BANANA' ) {
    return [];
  }

  return state;
}