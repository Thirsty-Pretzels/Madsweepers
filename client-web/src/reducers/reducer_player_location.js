export default function(state = [ {id:'player1', x: 0, y: 0},
      {id:'player2', x: 9, y: 9}, {id:'player3', x: 5, y: 5} ], action) {

  var newPlayerLocation;
  //action.type === ARROWUP, ARROWDOWN, ARROWLEFT, ARROWRIGHT means new data is received from server, render new positions by updating states.
  if( action.type === 'ARROWUP' || action.type === 'ARROWDOWN' || action.type === 'ARROWLEFT' || action.type === 'ARROWRIGHT') {
    return action.payload;
  }
  else if ( action.type = 'ARROWSTAY') {
    return state;
  }
}