var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var message = 'It works!\n',
        version = 'NodeJS ' + process.versions.node + '\n',
        response = [message, version].join('\n');
    res.end(response);
});
server.listen();

const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;;

app.get('/', function (_, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, function() {
    console.log(`Server istening on port ${PORT}`)
});