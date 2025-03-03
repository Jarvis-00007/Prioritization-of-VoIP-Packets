"use client";
import { useState } from "react";

export default function CallPage() {
  const [inCall, setInCall] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">VoIP Call</h1>
      {!inCall ? (
        <button
          className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg"
          onClick={() => setInCall(true)}
        >
          Start Call
        </button>
      ) : (
        <div className="mt-4">
          <p className="text-lg font-semibold">In Call...</p>
          <button
            className="mt-2 px-6 py-3 bg-red-500 text-white rounded-lg"
            onClick={() => setInCall(false)}
          >
            End Call
          </button>
        </div>
      )}
    </div>
  );
}
