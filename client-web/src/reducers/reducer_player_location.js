export default function(state, action) {
  switch(action.type) {
  case 'UP':
    return {x: action.payload.x, y: action.payload.y - 1};
    break;
  case 'DOWN':
    return {x: action.payload.x, y: action.payload.y + 1};
    break;
  case 'LEFT':
    return {x: action.payload.x - 1, y: action.payload.y};
    break;
  case 'RIGHT':
    return {x: action.payload.x + 1, y: action.payload.y};
    break;
  }

  return {x: 5, y: 5};
}