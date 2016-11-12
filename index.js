var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/client-web/index.html');
// });


io.on('connection', function(socket){
  console.log('a user connected');
  // Example
  socket.on('eventNameHere', function(data) {
    console.log(data, 'received data from eventNameHere');
    // to send stuff back to client side
    io.emit('eventNameHere', data)
  })
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});