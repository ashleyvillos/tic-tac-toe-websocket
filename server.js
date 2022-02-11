const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);  

app.use(express.static('static'))

// POST, GET
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

server.listen(3000, function() {
    console.log('listening on *:3000');
});

// THIS IS SERVER
io.on('connection', function(socket) {
    // socket.on('connecting', function(msg){
    //     console.log(msg)
    //     console.log(msg.element2)
    // })
    // socket.emit('connection confirmation', 'Naka connect na ka')

    // broadcast
    // socket.broadcast.emit('connection confirmation', "Someone connected to the server")
    socket.emit('connected')
    socket.on('move', function(msg){
        socket.broadcast.emit('move', msg)
    })


})




// www.facebook.com --> 102.154.56.97:3000  --> IP address : port
// htttp://localhost:5000
// htttp://127.0.0.1:5000
// http://0.0.0.0:5000