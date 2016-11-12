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

  console.log(keyPress);

  return {
    type: keyPress,
    playerId: playerId,
    payload: location
  }

}