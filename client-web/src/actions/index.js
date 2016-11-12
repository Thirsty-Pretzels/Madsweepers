export function movePlayer(direction, location) {
  // var newLocation
  // socket.emit('movePlayer', location);
  // socket.on('movePlayer', (data) => {
  //   console.log('*******', data);
  //   newLocation = data;
  // });

  return {
    type: direction,
    payload: location
  }
}