const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes.js');

mongoose.connect('mongodb+srv://devking:grem29rsdapoa@cluster0-9jotn.mongodb.net/omnistack8?retryWrites=true&w=majority', {
	useNewUrlParser: true
});

const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
	const { user } = socket.handshake.query;
	connectedUsers[ user ] = socket.id;
});

app.use((req, res, next) => {
	req.io = io;
	req.connectedUsers = connectedUsers;

	return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 8080
server.listen(port, function() {
	console.log('running express in http://localhost:'+ port);
});