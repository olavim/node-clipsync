# Clipsync

Program to synchronize clipboards between multiple machines (Windows, OS X, Linux).

### Install

Run `npm install clipsync --global` from the command line. This will install the program globally on your system and you can use it from anywhere.

### How to use

The program consists of a central server machine and a number of clients. First you have to start the server, then connect to it from the machines you wish to sync with the server.

`clipsync [args]`

### Arguments

|Argument|Explanation|
|---|---|
|`--port` or `-p`|Specifies the port to listen on/connect to (default port is 9009)|
|`--host` or `-h`|Specifies the address of the server to connect to.|

### Examples

Start a clipsync server on port 9009

    clipsync

Start a clipsync server on port 3003

    clipsync --port 3003

Connect to a clipsync server located at the ip-address 192.168.1.40, listening on port 9009

    clipsync --host 192.168.1.40

Same as above, but listening on port 2000

    clipsync --host 192.168.1.40 --port 2000
