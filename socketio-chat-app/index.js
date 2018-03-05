// setting up express server, importing required libraries
const express = require('express');
const app = express();
// require http library, createServer on express server
const server = require('http').createServer(app);
// require socketio, listen to the server we created above 
const io = require('socket.io').listen(server);

// define variables to hold total list of users, and total list of connected users
let users = [];
let connections = [];

// listen to port 8080
server.listen('8080', () => {
    console.log('server is running on port 8080')
})

// when user makes a get request to "/", send them the index page
app.get('/', (req, res) => {
    // because the express middleware is separate from res.sendFile, an absolute path must be defined
    //      __dirname returns the directory that the currently executing script is in
    res.sendFile(__dirname + '/index.html');
})

// io.sockets.on runs when a user connects to the server; 
io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log('a user has connected');
    console.log('there are %s users connected', connections.length);

    // the whole purpose of the chatapp is so that users can message each other. to do this,
    //      we can use the socket.on('send message') method to allow the server to send messages
    //      to the general users
    socket.on('send message', (data) => {
        io.sockets.emit('new message', {msg:data});
        console.log('server recieved a message from user: ' + data);

    });

    // we can use socket.on('disconnect') to specify actions to take when a user disconnects
    //      what we want to do is to splice the disconnected user from the array
    // when a user disconnects:
    socket.on('disconnect', () => {
        // this will remove the specific connection from the list of connections
        connections.splice(connections.indexOf(socket), 1)
        console.log('a user has disconnected');
        console.log('there are %s users left', connections.length);
    })
})