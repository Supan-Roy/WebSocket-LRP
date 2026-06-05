import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'path';

import { WebSocketServer } from 'ws'

const PORT = process.env.PORT ?? 9000;

const httpServer =  http.createServer(async function(req, res) {
    const indexFile = await fs.readFile(path.resolve('./index.html'), 'utf-8')
    res.setHeader('Content-Type', 'text/html');
    return res.end(indexFile);
});

const wsServer = new WebSocketServer({server: httpServer});

wsServer.on('connection', (websocket) => {
    console.log(`Websocket Connection...`);
    
    websocket.on('message', (data) => {
        console.log(`Websocket Message Received.`, data.toString());
        websocket.send('Pong! Hello from the server.')
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

