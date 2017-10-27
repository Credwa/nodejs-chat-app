const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;
let app = express();

app.use(express.static(__dirname + '/../'));

// serve frontend files to server
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'index.html'));
});

// start server on specified port
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
