"use client";
import { useState, useEffect } from "react";
import { FaMicrophone, FaMicrophoneSlash, FaPhoneSlash, FaPhone, FaHome } from "react-icons/fa";

export default function CallPage() {
  const [inCall, setInCall] = useState(false);

  const [isCallEnded, setIsCallEnded] = useState(false);
  const [callDuration, setCallDuration] = useState(0); // in seconds
  const [isMuted, setIsMuted] = useState(false);

  // Start timer while call is active
  useEffect(() => {
    if (!isCallEnded) {
      const interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isCallEnded]);

  // Format seconds as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleGoHome = () => {
    // Implement the logic to go home
    console.log("Going home...");
  };

  const handleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleEndCall = () => {
    setIsCallEnded(true);
  };

  const handleCallAgain = () => {
    setIsCallEnded(false);
    setCallDuration(0);
    setIsMuted(false);
  };

  // Determine call status based on state
  const callStatus = isCallEnded ? "Call ended" : (isMuted ? "Call muted" : "Call ongoing");

  return (
    <div className="call-container">
      <div className="profile-pic">
        <img src="https://i.pravatar.cc/150?img=2" alt="Profile" />
      </div>
      <div className="caller-name">Dialed Server</div>
      <div className="call-timer">{formatTime(callDuration)}</div>
      
      {/* Call status placed above the action icons */}
      <div className="call-status">{callStatus}</div>
      
      <div className="call-actions">
        {/* While call is active, display both Mute and End Call buttons */}
        {!isCallEnded ? (
          <>
            <button
              className="action-btn mute"
              onClick={handleMute}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
            </button>
            <button
              className="action-btn end-call"
              onClick={handleEndCall}
              title="End Call"
            >
              <FaPhoneSlash size={24} />
            </button>
          </>
        ) : (
          // After call ends, show the Call Again and Go Home buttons
          <>
            <button className="action-btn go-home" onClick={() => window.location.href = "/home"} title="Go Home">
              <FaHome size={24} />
            </button>
            <button
              className="action-btn call-again"
              onClick={handleCallAgain}
              title="Call Again"
            >
              <FaPhone size={24} />
            </button>
          
          </>
        )}
      </div>

      <style jsx>{`
        .call-container {
          background-color:rgb(0, 0, 0);
          color: #fff;
          font-family: Arial, sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
        }
        .profile-pic {
          width: 80px;
          height: 80px;
          margin-bottom: 0.5rem;
          border-radius: 50%;
          overflow: hidden;
          background-color: #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .profile-pic img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .caller-name {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }
        .call-timer {
          font-size: 1rem;
          color: #999;
          margin-bottom: 0.5rem;
        }
        .call-status {
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }
        .call-actions {
          display: flex;
          gap: 2rem;
        }
        .action-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          outline: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: #fff;
          transition: background-color 0.3s;
        }
        .mute {
          background-color: #22c55e;
        }
        .mute:hover {
          background-color: #22c55e;
        }
        .end-call {
          background-color: #d93025;
        }
        .end-call:hover {
          background-color: #b72b20;
        }
        .call-again {
          background-color: #22c55e;
        }
        .call-again:hover {
          background-color:#0d6f63;
        }
        .go-home {
          background-color: #22c55e;
        }
        .go-home:hover {
          background-color: #0d6f63;
        }
      `}</style>
    </div>
  );
}
