export function movePlayer(key, location, board) {
  var keyPress;
  if ( key.slice(0, 5) === 'Arrow' ) {
    if (key === 'ArrowUp' && location.y > 0 ) {
      keyPress = 'UP';
    } else if (key === 'ArrowDown' && location.y < board.length - 1) {
      keyPress = 'DOWN';
    } else if (key === 'ArrowLeft' && location.x > 0) {
      keyPress = 'LEFT';
    } else if (key === 'ArrowRight' && location.x < board[0].length - 1) {
      keyPress = 'RIGHT';
    }

    // if (!!keyPress) {
    //   socket.emit('movePlayer', location);
    //   socket.on('movePlayer', (data) => {
    //     console.log('keyPress: ', keyPress);
    //     console.log('payload: ', data);
    //     return {
    //       type: keyPress,
    //       payload: data
    //     }
    //   });

    // }

  }

  return {
    type: keyPress,
    payload: location
  }

}