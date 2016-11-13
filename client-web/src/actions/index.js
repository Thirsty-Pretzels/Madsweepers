// movePlayer action:
// movePlayer is fired when player is using keyboard to move
// type: UP, DOWN, LEFT, RIGHT
// commented added by Bruce
export function movePlayer(playerId, key, location, board) {
  var keyPress = 'STAY';

  if ( key.slice(0, 5) === 'Arrow' ) {
    if (key === 'ArrowUp' && location[playerId].y > 0 ) {
      keyPress = 'UP';
    } else if (key === 'ArrowDown' && location[playerId].y < board.length - 1) {
      keyPress = 'DOWN';
    } else if (key === 'ArrowLeft' && location[playerId].x > 0) {
      keyPress = 'LEFT';
    } else if (key === 'ArrowRight' && location[playerId].x < board[0].length - 1) {
      keyPress = 'RIGHT';
    }
  }

  return {
    type: keyPress,
    playerId: playerId,
    payload: location,
    //to be deleted
    board: board
  }
}

// updateLocation action:
// when data is received from server throught socket, this action will be fired through store.dispatch
// type: ARROWUP, ARROWDOWN, ARROWLEFT, ARROWRIGHT
// extra notice:
// prefixes are added to the type, so middleware can distinguish them from UP, DOWN, LEFT AND RIGHT
// in middleware, actions of type (UP, DOWN, LEFT AND RIGHT) will lead to socket.emit
// while actions of type (ARROWUP, ARROWDOWN, ARROWLEFT, ARROWRIGHT) will bypass middleware
// commented added by Bruce
export function updateLocation(playerId, key, location, board) {
  return {
    type: key,
    playerId: playerId,
    payload: location,
    //to be deleted
    board: board
  }
}

export function openSpace(playerId, location, board) {
  console.log('inside openSpace action');

  return {
    type: 'OPEN-SPACE',
    playerId: playerId,
    location: location,
    payload: board
  }
}

export function updateBoard(newBoard) {
  console.log('inside updateBoard action');

  return {
    type: 'UPDATE-BOARD',
    payload: newBoard
  }
}