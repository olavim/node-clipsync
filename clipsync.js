#!/usr/bin/env node

var ncp = require('copy-paste');
var net = require('net');

const argv = require('optimist').argv;
const isClient = !!argv.host || !!argv.h;
const serverPort = argv.port || argv.p || 9009;

var serverClipboard = '';
var timeout = createInterval();
var clients = [];

if (isClient) {
	setupClient();
} else {
	setupServer();
}

function setupClient() {
	var host = argv.host || argv.h;
	var socket = net.createConnection(serverPort, host, function() {
		console.log('Connected to server.');
	});
	handleCLientConnect(socket);
}

function setupServer() {
	const server = net.createServer(function(socket) {
		console.log('Client connected from ' + socket.remoteAddress);
		handleCLientConnect(socket);
	});

	server.listen(serverPort, function() {
		console.log('Clipsync server listening on port ' + serverPort);
	});
}

function handleCLientConnect(socket) {
	clients.push(socket);
	listenClientData(socket);
	listenClientEnd(socket);
	listenClientError(socket);
}

function listenClientData(socket) {
	socket.on('data', function(data) {
		data = data.toString();
		console.log('Received clipboard data: ' + data);
		ncp.copy(data);
		serverClipboard = data;
	});
}

function listenClientEnd(socket) {
	socket.on('end', function() {
		handleDisconnect(socket);
	});
}

function listenClientError(socket) {
	socket.on("error", function(err) {
		handleDisconnect(socket);
	});
}

function handleDisconnect(socket) {
	clients.splice(clients.indexOf(socket), 1);
	if (isClient)	clearInterval(timeout);

	console.log('Client at ' + socket.remoteAddress + ' disconnected from server.');
}

function createInterval() {
	return setInterval(function() {
		if (!clients.length) return;

		ncp.paste(function(err, currentClipboard) {
			if (currentClipboard && currentClipboard !== serverClipboard) {
				serverClipboard = currentClipboard;
				clients.forEach(function (c) {
					c.write(currentClipboard);
				});
			}
		});
	}, 500);
}
