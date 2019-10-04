const express = require('express');
const mongoose = require('mongoose');
const routes  = require('./routes.js');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://geekyweb-01:geekyweb01grem29rsdapoa@cluster0-9jotn.mongodb.net/ominstackrevisited?retryWrites=true&w=majority', {
	useNewUrlParser: true
});

const connectUsers = {};

io.on('connection', socket => {
	const { userid } = socket.handshake.query; 
	connectUsers[userid] = socket.id;
});

// middleware
app.use( (req, res, next) => {
	req.io = io;
	req.connectUsers = connectUsers;
	return next();
});


app.use(cors());
app.use(express.json());
app.use(routes);

port = process.env.PORT || 3333;
server.listen(port, () => {
	console.log(`Server Running in Port: ${port}`);
});

