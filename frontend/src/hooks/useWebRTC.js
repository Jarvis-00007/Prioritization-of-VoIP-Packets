import { useEffect, useRef, useState } from "react";

export const useWebRTC = (socket, userId) => {
    const [remoteStream, setRemoteStream] = useState(null);
    const peerConnection = useRef(null);
    
    useEffect(() => {
        if (!socket) return;

        peerConnection.current = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        peerConnection.current.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
        };

        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                socket.send(JSON.stringify({
                    type: "ice-candidate",
                    candidate: event.candidate,
                    target: "receiver-id",
                }));
            }
        };

        socket.onmessage = async (msg) => {
            const data = JSON.parse(msg.data);

            if (data.type === "call-offer") {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer));
                const answer = await peerConnection.current.createAnswer();
                await peerConnection.current.setLocalDescription(answer);
                socket.send(JSON.stringify({ type: "call-answer", answer, target: data.from }));
            } else if (data.type === "call-answer") {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer));
            } else if (data.type === "ice-candidate") {
                await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
            }
        };

        return () => peerConnection.current.close();
    }, [socket]);

    return { peerConnection: peerConnection.current, remoteStream };
};
