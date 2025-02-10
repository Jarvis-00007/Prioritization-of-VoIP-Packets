const WebSocket = require('ws');

// Create WebSocket server on port 3000
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', function connection(ws) {
    console.log('Client connected');

    // message sent by client to server
    ws.on('message', function incoming(message) {
        console.log(`Received: ${message}`);

        // Broadcast message to all connected clients
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // when we want to disconnect server
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log("WebSocket server running on ws://192.168.137.1:3000");
