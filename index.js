var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('subscripe', function(room) {
        socket.join(room);
    });
    socket.on('chat message', function(data){
        if(data.type == 1) {
          io.to(data.room).emit('user-sent', {msg:data.msg,room:data.room,type:data.type});
        }
        if(data.type == 2) {
          io.to(data.room).emit('admin-sent', {msg:data.msg,room:data.room,type:data.type});
        }
    });
    socket.on('disconnect', function(){
        // User Discounntected
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});