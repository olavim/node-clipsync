# Clipsync

Program to synchronize clipboards between multiple machines (Windows, OS X, Linux).

#### Install

Run `npm install` from the project folder.

#### How to use

The program consists of a central server machine and a number of clients. First you have to start the server, then connect to it from the machines you wish to sync with the server.

`node clipsync.js [args]`

#### Arguments

|`--port <port>` or `-p <port>`|Specifies the port to listen on/connect to (default port is 9009)|
|`--host <host>` or `-h <host>`|Specifies the address of the server to connect to.|

#### Examples

Start a clipsync server on port 9009

`node clipsync.js`

Start a clipsync server on port 3003

`node clipsync.js --port 3003`

Connect to a clipsync server located at the ip-address 192.168.1.40, listening on port 9009

`node clipsync.js --host 192.168.1.40`

Same as above, but listening on port 2000

`node clipsync.js --host 192.168.1.40 --port 2000`
