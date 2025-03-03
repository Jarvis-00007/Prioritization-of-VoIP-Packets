const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("ws"); // WebSocket for signaling
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Connection Error:", err));

app.use("/api/auth", authRoutes);

// WebSocket Server for WebRTC Signaling
const wss = new Server({ server });

const users = {}; // Store connected users

wss.on("connection", (ws) => {
    console.log("New WebSocket connection established");

    // Send a test message every 2 seconds
    setInterval(() => {
        ws.send(JSON.stringify({ type: "test", data: "Hello from server!" }));
    }, 2000);

    ws.on("message", (message) => {
        const data = JSON.parse(message);

        switch (data.type) {
            case "register":
                users[data.userId] = ws;
                console.log(`${data.userId} registered for signaling`);
                break;

            case "call-offer":
                if (users[data.target]) {
                    users[data.target].send(JSON.stringify({ type: "call-offer", offer: data.offer, from: data.from }));
                }
                break;

            case "call-answer":
                if (users[data.target]) {
                    users[data.target].send(JSON.stringify({ type: "call-answer", answer: data.answer }));
                }
                break;

            case "ice-candidate":
                if (users[data.target]) {
                    users[data.target].send(JSON.stringify({ type: "ice-candidate", candidate: data.candidate }));
                }
                break;

            case "end-call":
                if (users[data.target]) {
                    users[data.target].send(JSON.stringify({ type: "end-call" }));
                }
                break;
        }
    });

    ws.on("close", () => {
        for (const user in users) {
            if (users[user] === ws) {
                delete users[user];
                console.log(`${user} disconnected`);
                break;
            }
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

