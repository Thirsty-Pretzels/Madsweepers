var localUserName;

// define action when a temperory user is trying to login
export function loginTempUser(username) {
  localUserName = username;
  return {
    type: 'LOGIN-TEMP-USER',
    payload: username
  }
}

export function newUser(userInfo) {
  return {
    type: 'NEW-USER',
    payload: userInfo
  }
}

export function updateRoomList(rooms) {
  return {
    type: 'ROOM-LIST-UPDATE',
    payload: rooms
  }
}

export function enterRoom(roomname, username, inRoom, inRoomname) {
  return {
    type: 'ENTER-ROOM',
    room: roomname,
    user: username,
    inRoom: inRoom,
    inRoomname: inRoomname
  }
}

export function hasEnteredRoom(roomname) {
  return {
    type: 'ENTERED-ROOM',
    room: roomname
  }
}

export function leaveRoom(roomname, username) {
  return {
    type: 'LEAVE-ROOM',
    room: roomname,
    user: username
  }
}

export function hasLeftRoom(roomname) {
  return {
    type: 'LEFT-ROOM',
    room: roomname
  }
}

export function toggleReady(room, user) {
  return {
    type: 'TOGGLE-READY',
    room: room,
    user: user
  }
}

export function hasToggledReady() {
  return {
    type: 'TOGGLED-READY'
  }
}

export function allReady(isAllPlayersReady) {
  return {
    type: 'ALL-READY',
    ready: isAllPlayersReady
  }
}

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
    payload: playerId
  }
}

export function updateUsername(newUsername) {
  return {
    type: 'UPDATE_USERNAME',
    payload: newUsername
  }
}

export function updateRoomName(roomName) {
  return {
    type: 'UPDATE_ROOMNAME',
    payload: roomName
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
export function updateLocation(newLocations, boardSize) {
  return {
    type: 'updatePlayerLocations',
    payload: newLocations,
    boardSize: boardSize,
    playerId: localUserName
  }
}

export function openSpace(playerId, location) {
  return {
    type: 'OPEN-SPACE',
    playerId: playerId,
    location: location
  }
}

export function updateBoard(newBoard) {
  return {
    type: 'UPDATE-BOARD',
    payload: newBoard
  }
}

export function getNewBoard() {
  return {
    type: 'GET-NEW-BOARD'
  }
}

export function dropFlag(playerId, location) {
  return {
    type: 'DROP-FLAG',
    playerId: playerId,
    location: location
  }
}

// export function createNewPlayer(playerId, roomName) {
//   return {
//     type: 'CREATE-PLAYER',
//     payload: playerId,
//     roomName: roomName
//   }
// }

// define updateScore actions
export function updateScore(scoreChange) {
  return {
    type: 'UPDATE-SCORE',
    scoreChange: scoreChange
  }
};

export function countMines(minesInfo) {
  return {
    type: 'COUNT-MINES',
    minesInfo: minesInfo
  }
};

export function endification() {
  return {
    type: 'END-GAME'
  }
};