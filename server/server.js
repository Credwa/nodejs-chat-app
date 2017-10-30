const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

let { generageMessage } = require('./utils/message');

const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generageMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generageMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message) => {
        console.log('CreateMessage', message);
        io.emit('newMessage', generageMessage(message.from, message.text));
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server')
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
