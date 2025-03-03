"use client";

import { useContext, useRef, useState } from "react";
import { WebSocketContext } from "@/context/WebSocketContext";
import { useWebRTC } from "@/hooks/useWebRTC";

const CallUI = ({ userId }) => {
    const socket = useContext(WebSocketContext);
    const { peerConnection, remoteStream } = useWebRTC(socket, userId);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [callStarted, setCallStarted] = useState(false);

    const startCall = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;

        stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        socket.send(JSON.stringify({ type: "call-offer", offer, target: "receiver-id", from: userId }));
        setCallStarted(true);
    };

    return (
        <div>
            <video ref={localVideoRef} autoPlay playsInline muted />
            <video ref={remoteVideoRef} autoPlay playsInline />

            {!callStarted && <button onClick={startCall}>Start Call</button>}
        </div>
    );
};

export default CallUI;
