"use client";

import { createContext, useEffect, useState } from "react";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket("ws://192.168.126.113:5000"); // Replace with server IP

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
