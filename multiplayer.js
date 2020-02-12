const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
// eslint-disable-next-line no-var
var player = 1;

// Chargement du fichier index.html affiché au client

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + '/style.css');
});

app.get('/highscore.js', function(req, res) {
  res.sendFile(__dirname + '/highscore.js');
});

app.get('/chess.js', function(req, res) {
  res.sendFile(__dirname + '/chess.js');
});

app.get('/patterns.js', function(req, res) {
  res.sendFile(__dirname + '/patterns.js');
});

app.use('/img', express.static('img'));

// Chargement de socket.io

io.on('connection', function(socket) {
  socket.on('init', function() {
    socket.emit('init', player);
    player--;
  });
  socket.on('move', function(move) {
    socket.broadcast.emit('move', move);
  });
});


server.listen(8080);
