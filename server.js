const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);  

app.use(express.static('static'))

// POST, GET
app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/static/index.html');
    res.sendFile(__dirname + '/static/game.html');
});

// app.get('/game', (req, res) => {
//     res.sendFile(__dirname + '/static/game.html');
// })

server.listen(3000, function() {
    console.log('listening on *:3000');
});


let websocket_connections = {} // {socket id : socket object, socket id 2 : socket object 2, socket id 3 : socket object 3}
let servers = []

// THIS IS SERVER
io.on('connection', function(socket) {
    // Object.keys() --> is used to get keys from the object and convert them into array --> Returns an array of the keys of your object
    // Object.values()
    // .includes() --> is used to check if an array has a specific value --> True or False

    // if ang socket id is wala sa websocket_connections na variable
    if (!Object.keys(websocket_connections).includes(socket.id)) {
        console.log('adding user ' + socket.id)
        websocket_connections[socket.id] = socket
    }

    for (const [socket_id, socket_object] of Object.entries(websocket_connections)) {
        console.log('sending to ' + socket_id)
        socket_object.emit('message', 'A new user has connected')
    }

    socket.on('disconnect', function() {
        console.log(socket.id + ' has disconnected')
        delete websocket_connections[socket.id]

        console.log('Connected users : ' + Object.keys(websocket_connections))
    })


    socket.on('create-server', function() {
        servers.push({
            name : socket.id,
            participants : [socket]
        })

        socket.emit('create-server-response', {name : socket.id})
    })

    socket.on('join-server', function() {
        let joined = false
        
        for (let i = 0; i < servers.length; i++) {

            if (servers[i].participants.length == 1) {
                servers[i].participants.push(socket)
                socket.emit('join-server-response', {name : servers[i].name, joined : true})
                joined = true
                break
            }
        }

        if (!joined) {
            socket.emit('join-server-response', {joined : false})   
        }
    })



    // let arr_object = ["one", "two", "three", "four"]

    // for (let i = 0; i < arr_object.length; i++) {
    //     console.log(arr_object[i])
    // }

    // for (const index in arr_object) {
    //     console.log(arr_object[index])
    // }

    // for (const arr of arr_object) {
    //     console.log(arr)
    // }


    // socket.on('connecting', function(msg){
    //     console.log(msg)
    //     console.log(msg.element2)
    // })
    // socket.emit('connection confirmation', 'Naka connect na ka')

    // broadcast
    // socket.broadcast.emit('connection confirmation', "Someone connected to the server")
    socket.emit('connected')

    socket.on('move', function(payload){
        let server_name = payload.server_name

        for (let i = 0; i < servers.length; i++) {

            if (servers[i].name == server_name) {
                
                for (let j = 0; j < servers[i].participants.length; j++) {
                    servers[i].participants[j].emit('move', payload)
                }
            }
        }
    })
})



// www.facebook.com --> 102.154.56.97:3000  --> IP address : port
// htttp://localhost:5000
// htttp://127.0.0.1:5000
// http://0.0.0.0:5000