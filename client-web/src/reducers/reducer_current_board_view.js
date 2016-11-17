export default function(state, action) {
  state = state || createCurrentView();

  if ( action.type === 'updatePlayerLocations') {
    let startPoint = determineStartPoint(action.payload, action.boardSize);

    return createCurrentView(startPoint);
  }

  return state
}

var determineStartPoint = (playerLocation, boardSize) => {
    let key = Object.keys(playerLocation)[0];

    var x = playerLocation[key].x - 6;
    var y = playerLocation[key].y - 6;

    if ( x < 0 ) {
      x = 0;
    } else if ( x + 12 > boardSize[0] ) {
      x = boardSize[0] - 12;
    }

    if ( y < 0 ) {
      y = 0;
    } else if ( y + 12 > boardSize[1] ) {
      y = boardSize[1] - 12;
    }

    return [x, y];

}

var createCurrentView = (startPoint=[0,0]) => {
  var outPut = [];
  var y = startPoint[1];

  for (var i = 0; i < 12; i++) {
    var x = startPoint[0];
    var newRow = [];
    for (var j = 0; j < 12; j++) {
      newRow.push([x + j, y]);
    }
    outPut.push(newRow);
    y++;
  }

  return outPut;
}

// console.log(determineStartPoint({key: {x: 12, y: 2}}, [30,20]));


