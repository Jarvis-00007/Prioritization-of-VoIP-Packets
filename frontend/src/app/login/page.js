"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPhone } from "react-icons/fa"; // IMPORTING THE PHONE ICON

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        router.push("/home");
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <div
        style={{
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "6rem",
          height: "6rem",
          borderRadius: "50%",
          backgroundColor: "#22c55e",
        }}
      >
        <FaPhone size={50} style={{ color: "white" }} />
      </div>

      <div
        style={{
          backgroundColor: "#1f2937",
          padding: "1.5rem",
          borderRadius: "0.75rem",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          width: "20rem",
        }}
      >
        <h1
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            textAlign: "center",
            color: "#22c55e",
            marginBottom: "1rem",
          }}
        >
          Login to WebRTC Caller App
        </h1>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              border: "1px solid #374151",
              backgroundColor: "#1f2937",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              outline: "none",
              color: "white",
              marginBottom: "0.75rem",
            }}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              border: "1px solid #374151",
              backgroundColor: "#1f2937",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              outline: "none",
              color: "white",
              marginBottom: "0.75rem",
            }}
            required
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#16a34a",
              color: "white",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#15803d")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#16a34a")}
          >
            Login
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            color: "#9ca3af",
            marginTop: "1rem",
          }}
        >
          Don't have an account?{" "}
          <span
            style={{
              color: "#22c55e",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
