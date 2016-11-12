export function movePlayer(direction, location) {
  return {
    type: direction,
    payload: location
  }
}