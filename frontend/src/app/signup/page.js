"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaPhone } from "react-icons/fa"; // IMPORTING THE PHONE ICON

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(""); 
  const router = useRouter();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        profilePic, 
      });
      alert("Signup Successful. Please log in.");
      router.push("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "black" }}>
      <div style={{ backgroundColor: "#1f2937", padding: "2rem", borderRadius: "1rem", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", width: "24rem" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "6rem", height: "6rem", borderRadius: "50%", backgroundColor: "#22c55e" }}>
            <FaPhone size={50} color="white" />
          </div>
        </div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", textAlign: "center", color: "#22c55e", marginTop: "1rem" }}>Sign Up</h2>
        <p style={{ fontSize: "0.875rem", textAlign: "center", color: "#9ca3af" }}>Join the WebRTC Voice Chat</p>
        
        {[{ placeholder: "Full Name", value: name, setter: setName },
          { placeholder: "Email", value: email, setter: setEmail },
          { placeholder: "Password", value: password, setter: setPassword, type: "password" },
          { placeholder: "Confirm Password", value: confirmPassword, setter: setConfirmPassword, type: "password" },
          { placeholder: "Profile Picture URL", value: profilePic, setter: setProfilePic }]
          .map(({ placeholder, value, setter, type = "text" }, index) => (
            <input
              key={index}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={(e) => setter(e.target.value)}
              style={{ width: "100%", padding: "0.75rem", marginTop: "1rem", border: "1px solid #374151", borderRadius: "0.75rem", backgroundColor: "#1f2937", color: "white", placeholderColor: "#6b7280" }}
            />
        ))}

        <button
          onClick={handleSignup}
          style={{ width: "100%", marginTop: "1rem", backgroundColor: "#22c55e", color: "white", padding: "0.5rem", borderRadius: "0.75rem", cursor: "pointer", transition: "background-color 0.2s" }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#16a34a"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#22c55e"}
        >
          Sign Up
        </button>
        
        <p style={{ fontSize: "0.875rem", marginTop: "1rem", textAlign: "center", color: "#9ca3af" }}>
          Already have an account? <a href="/login" style={{ color: "#22c55e", fontWeight: "600", textDecoration: "none" }}>Login</a>
        </p>
      </div>
    </div>
  );
}
