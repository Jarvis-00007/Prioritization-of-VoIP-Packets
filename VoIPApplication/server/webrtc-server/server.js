// const fs = require('fs');
// const https = require('https');
// const WebSocket = require('ws');

// const server = https.createServer({
//     cert: fs.readFileSync("C:\\Windows\\System32\\cert.pem"),
//     key: fs.readFileSync("C:\\Windows\\System32\\key.pem")
// });

// // Create WebSocket server on port 3000
// const wss = new WebSocket.Server({ server });

// wss.on('connection', function connection(ws) {
//     console.log('Client connected');

//     // message sent by client to server
//     ws.on('message', function incoming(message) {
//         console.log(`Received: ${message}`);

//         // Broadcast message to all connected clients
//         wss.clients.forEach(function each(client) {
//             if (client !== ws && client.readyState === WebSocket.OPEN) {
//                 client.send(message);
//             }
//         });
//     });

//     // when we want to disconnect server
//     ws.on('close', () => {
//         console.log('Client disconnected');
//     });
// });

// console.log("WebSocket server running on wss://192.168.137.1:3000");

const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

// Secure file paths (move them out of System32)
const CERT_PATH = "C:\\Users\\HP\\Documents\\ssl\\cert2.pem";
const KEY_PATH = "C:\\Users\\HP\\Documents\\ssl\\key2.pem";

let options;
try {
    options = {
        cert: fs.readFileSync(CERT_PATH),
        key: fs.readFileSync(KEY_PATH)
    };
} catch (err) {
    console.error("Error reading SSL certificate files:", err.message);
    process.exit(1); // Stop execution if certs are missing
}

// Create HTTPS server
const server = https.createServer(options);

// Create WebSocket Server on top of HTTPS
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log('Client connected');

    // Handle messages from clients
    ws.on('message', function incoming(message) {
        console.log(`Received: ${message}`);

        // Broadcast message to all connected clients
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Ensure the server keeps running
server.listen(3000, '192.168.110.19', () => {
    console.log("WebSocket server running on wss://192.168.110.19:3000");
});

// Handle server errors
server.on('error', (err) => {
    console.error("Server Error:", err.message);
});

