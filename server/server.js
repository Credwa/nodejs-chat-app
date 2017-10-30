const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

let { generateMessage } = require('./utils/message');

const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('CreateMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
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
