const morgan = require('morgan');
const express = require('express');
const colors = require('colors');

const port = process.env.PORT || 1337

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));
app.use(morgan('dev'));

var count = 0;

io.on('connection', function(socket) {
  count++;
  io.sockets.emit('joined', count)
  socket.on('clientToServer', function(data) {
    socket.broadcast.emit('toEveryone', data)
  })
})

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html')
})

http.listen(port, function() {
  console.log(`Server started on port ${port}`.magenta);
});
