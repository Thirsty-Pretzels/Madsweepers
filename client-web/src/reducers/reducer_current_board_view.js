export default function(state, action) {
  state = state || createCurrentView();
  // const board

  if ( action.type === 'updatePlayerLocations') {
    let key = Object.keys(action.payload)[0];

    let x = action.payload[key].x - 6 > 0 ? action.payload[key].x - 6 : 0;
    let y = action.payload[key].y - 6 > 0 ? action.payload[key].y - 6 : 0;

    console.log('update current board view payload: ', x, y );
    // let newCurrentView = createCurrentView()

  }

  return state
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