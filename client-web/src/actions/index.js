var localUserName;

// action template. this function is tested in mocha
export function action(type, payload) {
  if (typeof payload === 'undefined') {
    return { type };
  }
  return { type, payload };
}

// create action template. this function is tested in mocha
export function createAction(type, payload) {
  return action (type, payload);
}


// define action when a temperory user is trying to login
export function loginTempUser(username) {
  localUserName = username;
  return createAction('LOGIN-TEMP-USER', username);
}

export function newUser(userInfo) {
  return createAction('NEW-USER', userInfo);
}

// haven't written test yet
export function updateRoomList(rooms) {
  return createAction('ROOM-LIST-UPDATE', rooms);
}

// haven't written test yet
export function updateRoomInfo(info) {
  return createAction('ROOM-INFO-UPDATE', info);
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

// haven't written test yet
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

// haven't written test yet
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

// haven't written test yet
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

// haven't written test yet
export function toggleCreateRoomPanel() {
  return {
    type: 'TOGGLE-CREATE-ROOM-PANEL'
  }
}

export function createNewRoom(roomName, row, col, mineDensity) {
  return {
    type: 'CREATE-NEW-ROOM',
    roomName: roomName,
    row: row,
    col: col,
    mineDensity: mineDensity
  }
}

// haven't written test yet
export function hasCreatedNewRoom() {
  return {
    type: 'CREATED-NEW-ROOM'
  }
}

// haven't written test yet
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

// not using anymore
export function updateUsername(newUsername) {
  return {
    type: 'UPDATE_USERNAME',
    payload: newUsername
  }
}

// not using any more;
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


export function endification(val, gameResult) {
  return {
    type: 'END-GAME',
    payload: val,
    gameResult: gameResult
  }
};

export function updateHighScore(scores) {
  return {
    type: 'UPDATE-HIGH-SCORE',
    highScores: scores
  }
};

export function updateGameTime(gameTime) {
  return {
    type: 'UPDATE-GAME-TIME',
    payload: gameTime
  }
}

export function updateBulletLocation(bulletLocation, boardSize) {
  return {
    type: 'UPDATE-BULLET-LOCATION',
    payload: bulletLocation,
    boardSize: boardSize
  }
}

export function removeAllBullet() {
  return {
    type: 'REMOVE-ALL-BULLET'
  }
}

export function fireBullet(bulletInfo) {
  return {
    type: 'FIRE-BULLET',
    payload: bulletInfo
  }
}

export function addBullet(newBullet, id) {
  return {
    type: 'ADD-BULLET',
    payload: newBullet,
    id: id
  }
}

export function beingStun() {
  return {
    type: 'STUN'
  }
}

export function updateLoot(loot) {
  return {
    type: 'UPDATE-LOOT',
    payload: loot
  }
}

export function bananaOut(location) {
  return {
    type: 'BANANA-OUT',
    payload: location
  }
}

export function updateBanana(update) {
  return {
    type: update.type,
    payload: update.location
  }
}
export function makeDance() {
  return {
    type: 'MAKE-DANCE'
  }
}

export function endDance(username) {
  return createAction('END-DANCE', username);
}

export function broadcast(message) {
  return {
    type: 'BROADCAST',
    message: message,
    date: Date.now()
  }
}

export function checkOutdatedMessage() {
  return {
    type: 'CHECK-OUTDATED-MESSAGE',
    date: Date.now()
  }
}

export function directToMainPage(bool) {
  return {
    type: 'DIRECT-TO-MAIN-PAGE',
    payload: bool
  }
}
