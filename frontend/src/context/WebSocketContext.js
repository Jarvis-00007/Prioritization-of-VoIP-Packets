"use client";

import { createContext, useEffect, useState } from "react";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket("wss://1af4-2409-40f2-3058-fd1a-e009-e09c-86b3-c288.ngrok-free.app"); // Replace with server IP

        ws.onopen = () => console.log("Connected to WebSocket");
        ws.onmessage = (msg) => console.log("Message received:", msg.data);
        ws.onerror = (err) => console.error("WebSocket error:", err);
        ws.onclose = () => console.log("WebSocket closed");

        setSocket(ws);

        return () => ws.close();
    }, []);

    return (
        <WebSocketContext.Provider value={socket}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
