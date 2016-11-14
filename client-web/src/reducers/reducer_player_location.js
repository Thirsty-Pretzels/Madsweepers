export default function(state = [ {id:'player1', x: 0, y: 0},
      {id:'player2', x: 9, y: 9}, {id:'player3', x: 5, y: 5} ], action) {

  //action.type === updatePlayerLocations means new data is received from server, render new positions by updating states.
  if( action.type === 'updatePlayerLocations') {
    console.log('inside player location reducer', action.payload);
    return action.payload;
  } else {
    return state;
  }
}