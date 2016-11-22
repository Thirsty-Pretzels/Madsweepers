export default function(state = [{id: 'e', direction: 2, x: 5, y: 5}, {id: 'f', direction: 3, x: 5, y: 15}], action) {
  if (action.type === 'UPDATE-BULLET-LOCATION') {
    return action.payload.filter(bullet =>
        bullet.x > 0 &&
        bullet.y > 0 &&
        bullet.x < action.boardSize.x - 1 &&
        bullet.y < action.boardSize.y - 1
      ).map(bullet => {
      if ( bullet.direction === 3 ) {
        bullet.y--;
        return bullet;
      } else if ( bullet.direction === 4 ) {
        bullet.y++;
        return bullet;
      } else if ( bullet.direction === 1 ) {
        bullet.x--;
        return bullet;
      } else if ( bullet.direction === 2 ) {
        bullet.x++;
        return bullet;
      }
    });
  } else if ( action.type === 'ADD-BULLET' ) {
    const newBullet = {
      id: action.id,
      direction: action.payload.status,
      x: action.payload.x,
      y: action.payload.y
    }

    var newState = state.slice();
    newState.push(newBullet);
    return newState;
  }

  return state;
}