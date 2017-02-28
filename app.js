const morgan = require('morgan');
const express = require('express');
const colors = require('colors');

const port = process.env.PORT || 1337

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html')
})

http.listen(port, function() {
  console.log(`Server started on port ${port}`.magenta);
});
