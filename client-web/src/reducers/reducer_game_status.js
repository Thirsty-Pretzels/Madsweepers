export default function(state = ['', ''], action) {
  if (action.type === 'COUNT-MINES') {
  	console.log('inside reducer: ', action.mineInfo);
    var newState = [action.minesInfo[0], action.minesInfo[1]];
    return newState;
  } else {
    return state;
  }
}