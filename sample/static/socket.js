var socket = io('http://localhost:3000');


socket.emit('test', {'test' : 'vaue'})
socket.on('receive', (msg) => {
    myfunc_3()
    myfunc()
})

socket.on('broadcast', (msg) => {
    console.log('someone connected')
})
