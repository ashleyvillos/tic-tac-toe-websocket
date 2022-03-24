var socket = io('http://localhost:3000');

const btn_create = document.getElementById('btn-create-server')
const btn_join = document.getElementById('btn-join-server')
var my_server = ""

btn_create.addEventListener('click', function() {
    socket.emit('create-server')
})

btn_join.addEventListener('click', function() {
    socket.emit('join-server')
})

socket.on('create-server-response', function(payload) {
    const server_name = document.getElementById('server-name')
    server_name.innerHTML = "You are currently in server " + payload.name

    my_server = payload.name
})

socket.on('join-server-response', function(payload) {
    const server_name = document.getElementById('server-name')

    // if joined is false
    if (!payload.joined) {
        server_name.innerHTML = "Servers are full."
    }

    else {
        server_name.innerHTML = "You are currently in server " + payload.name
        my_server = payload.name
    }
})

socket.on('connected', function(){
    // alert('Connected to Server')
})

socket.on('message', function(payload) {
    // alert(payload)
})

socket.on('broadcast', function(payload) {
    alert(payload)
})


socket.on('move', function(msg){
    flag = msg['flag']

    if(msg['box'] == 'b1') {
        myfunc_3()
        myfunc()
    }

    else if(msg['box'] == 'b2'){
        myfunc_4(); 
        myfunc();
    }

    else if(msg['box'] == 'b3'){
        myfunc_5(); 
        myfunc();
    }

    else if(msg['box'] == 'b4'){
        myfunc_6(); 
        myfunc();
    }

    else if(msg['box'] == 'b5'){
        myfunc_7(); 
        myfunc();
    }

    else if(msg['box'] == 'b6'){
        myfunc_8(); 
        myfunc();
    }

    else if(msg['box'] == 'b7'){
        myfunc_9(); 
        myfunc();
    }

    else if(msg['box'] == 'b8'){
        myfunc_10();
        myfunc();
    }

    else if(msg['box'] == 'b9'){
        myfunc_11();
        myfunc();
    }
})


document.getElementById('b1').addEventListener('click', function(){
    socket.emit('move', {'flag' : flag, 'box' : 'b1', 'server_name' : my_server})
    console.log('THIS IS THE SERVER NAME: ' + my_server)
    myfunc_3()
    myfunc()
})

document.getElementById('b2').addEventListener('click', function() {
    socket.emit('move', {'flag' : flag, 'box' : 'b2', 'server_name' : my_server})
    myfunc_4(); 
    myfunc();
})

document.getElementById('b3').addEventListener('click', function() {
    socket.emit('move', {'flag' : flag, 'box' : 'b3', 'server_name' : my_server})
    myfunc_5(); 
    myfunc();
})

document.getElementById('b4').addEventListener('click', function() {
    socket.emit('move', {'flag' : flag, 'box' : 'b4', 'server_name' : my_server})
    myfunc_6(); 
    myfunc();
})

document.getElementById('b5').addEventListener('click', function() {
    socket.emit('move', {'flag' : flag, 'box' : 'b5', 'server_name' : my_server})
    myfunc_7(); 
    myfunc();
})

document.getElementById('b6').addEventListener('click', function() {
    socket.emit('move', {'flag' : flag, 'box' : 'b6', 'server_name' : my_server})
    myfunc_8(); 
    myfunc();
})

document.getElementById('b7').addEventListener('click', function() {
    socket.emit('move', {'flag' : flag, 'box' : 'b7', 'server_name' : my_server})
    myfunc_9(); 
    myfunc();
})

document.getElementById('b8').addEventListener('click', function() {
    socket.emit('move', {'flag' : flag, 'box' : 'b8', 'server_name' : my_server})
    myfunc_10();
    myfunc();
})

document.getElementById('b9').addEventListener('click', function() {
    socket.emit('move', {'flag' : flag, 'box' : 'b9', 'server_name' : my_server})
    myfunc_11();
    myfunc();
})

