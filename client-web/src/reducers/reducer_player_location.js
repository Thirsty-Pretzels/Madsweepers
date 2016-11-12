export default function(state, action) {

  const playerId = `player${action.playerId + 1}`;
  var newPlayerLocation = action.payload;

  switch(action.type) {
  case 'UP':
    newPlayerLocation[action.playerId] = {
      id: playerId,
      x: action.payload[action.playerId].x,
      y: action.payload[action.playerId].y - 1}
    break;
  case 'DOWN':
    newPlayerLocation[action.playerId] = {
      id: playerId,
      x: action.payload[action.playerId].x,
      y: action.payload[action.playerId].y + 1}
    break;
  case 'LEFT':
    newPlayerLocation[action.playerId] = {
      id: playerId,
      x: action.payload[action.playerId].x - 1,
      y: action.payload[action.playerId].y}
    break;
  case 'RIGHT':
    newPlayerLocation[action.playerId] = {
      id: playerId,
      x: action.payload[action.playerId].x + 1,
      y: action.payload[action.playerId].y}
    break;
  case 'STAY':
    break;
  }

  return newPlayerLocation ? newPlayerLocation :
  [
    {id:'player1', x: 0, y: 0},
    {id:'player2', x: 9, y: 9},
    {id:'player3', x: 5, y: 5}];
}