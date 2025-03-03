
import CallUI from "@/components/CallUI";
import { WebSocketProvider } from "@/context/WebSocketContext";

export default function Home() {
    return (
        <WebSocketProvider>
            <main>
                <h1>WebRTC Call Interface</h1>
                <CallUI userId="caller-1" />
            </main>
        </WebSocketProvider>
    );
}

