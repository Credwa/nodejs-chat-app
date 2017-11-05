const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

let { generateMessage } = require('./utils/message');

const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

let currentUsers = [];

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('newUser', (user) => {
        currentUsers.push(user);
        // send out list of current users when new user joins
        socket.emit('newUser', currentUsers);
        console.log(currentUsers);
    });

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('CreateMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        console.log('Message Emitted', coords);
        io.emit('newLocationMessage', generateMessage(coords.from, `${coords.latitude},${coords.longitude}`))
    });

    socket.on('userLeft', (user) => {
        currentUsers = currentUsers.filter((val) => {
            return val !== user;
        });
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server')
        socket.broadcast.emit('newMessage', generateMessage('Admin', 'User left'));
    });
});

app.use(express.static(__dirname + '/../'));

// serve frontend files to server
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + 'index.html'));
});

// start server on specified port
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});