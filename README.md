# Prioritization-of-VoIP-Packets
Prioritizing VoIP Packets in order to reduce latency and jitter using eBPF.
We are using a customised VoIP applictaion created using webRTC which allow VoIP packet transfer between two devices. Then we ought to increase the priority of these packets using eBPF to create hook points in the networking stack of linux kernel. We expect to reduce latency and jitter of these packets. 

To build a voice call application using WebRTC, you'll need the following components:

1. **WebRTC APIs** – Handles real-time audio streaming.
2. **Signaling Server** – Manages the exchange of connection details between peers (e.g., using WebSockets).
3. **STUN/TURN Servers** – Helps establish peer-to-peer connections by handling NAT traversal.
4. **Frontend UI** – For users to initiate and manage calls.
5. **Backend (Optional)** – If you need authentication, logging, or additional call management.

### **Tech Stack**
- **Frontend:** JavaScript (React, Vue, or plain HTML/CSS/JS)
- **Backend:** Node.js with WebSockets (or another signaling mechanism)
- **WebRTC STUN/TURN Servers:** Use public STUN servers or set up your own TURN server using Coturn.

### **Basic Flow**
1. **User A initiates a call** → Sends an offer via the signaling server.
2. **User B receives the offer** → Sends back an answer.
3. **Both users exchange ICE candidates** → Helps establish the peer-to-peer connection.
4. **WebRTC handles real-time audio transmission** once the connection is established.

Project under Progress 

