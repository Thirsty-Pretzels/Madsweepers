module.exports = function(io, socket, users, username, rooms) {
  // generate a uniq userId 
  console.log('building a new user', username);
  var tempUniqUserId = Date.now().toString(36) + ('' + Math.floor(Math.random() * 10000));
  var userCode = Math.ceil(Math.random()*12);
  // store the username in the users list
  users[socket.id] = {
  	username: username,
  	socket: socket.id,
  	tempUniqUserId: tempUniqUserId,
    userCode: userCode
  };

  socket.emit('newTempUser', {username: username, tempUniqUserId: tempUniqUserId, status: true, userCode: userCode});
  io.emit('roomListUpdate', rooms);
}