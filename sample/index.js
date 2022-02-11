const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);  

app.use(express.static('static'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('receive', '')
    
    socket.on('test', (msg) => {
        console.log(msg)
        console.log(msg['test'])
        console.log('test')
    })

    socket.broadcast.emit('broadcast', 'hello world')

    
});


