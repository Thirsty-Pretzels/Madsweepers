export default function(state = {'banana': 1, 'ammo': 1, 'shield': 0}, action) {
  if ( action.type === 'UPDATE-LOOT' ) {
    return action.payload;
  }

  return state;
}