"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPhoneAlt, FaUserFriends, FaTachometerAlt, FaArrowRight } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("recentCalls");
  const [showDashboardOption, setShowDashboardOption] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [ShowCallModal, setShowCallModal] =useState(false)
  const [clicked, setClicked]= useState(false);
  const [hoveredTab,setHoveredTab]=useState(null);
  const contacts = [
    { name: "John Doe", email: "john@example.com", profilePic: "https://i.pravatar.cc/50?img=1" },
    { name: "Alice Smith", email: "alice@example.com", profilePic: "https://i.pravatar.cc/50?img=2" },
    { name: "Michael Lee", email: "michael@example.com", profilePic: "https://i.pravatar.cc/50?img=3" },
    { name: "Sophia Wilson", email: "sophia@example.com", profilePic: "https://i.pravatar.cc/50?img=4" },
    { name: "David Brown", email: "david@example.com", profilePic: "https://i.pravatar.cc/50?img=5" },
    { name: "Emma White", email: "emma@example.com", profilePic: "https://i.pravatar.cc/50?img=6" },
    { name: "Olivia Davis", email: "olivia@example.com", profilePic: "https://i.pravatar.cc/50?img=7" },
    { name: "Liam Johnson", email: "liam@example.com", profilePic: "https://i.pravatar.cc/50?img=8" },
    { name: "Ethan Brown", email: "ethan@example.com", profilePic: "https://i.pravatar.cc/50?img=9" },
    { name: "Ava Martinez", email: "ava@example.com", profilePic: "https://i.pravatar.cc/50?img=10" },
  ];

  const recentCalls = [
    { name: "John Doe", time: "Today, 10:30 AM", profilePic: "https://i.pravatar.cc/50?img=1" },
    { name: "Alice Smith", time: "Yesterday, 8:15 PM", profilePic: "https://i.pravatar.cc/50?img=2" },
    { name: "Michael Lee", time: "Yesterday, 3:45 PM", profilePic: "https://i.pravatar.cc/50?img=3" },
    { name: "Sophia Wilson", time: "2 days ago, 6:20 PM", profilePic: "https://i.pravatar.cc/50?img=4" },
    { name: "David Brown", time: "3 days ago, 7:00 AM", profilePic: "https://i.pravatar.cc/50?img=5" },
  ];

  const handleCall = (contact) => {
    setSelectedContact(contact);
    setShowCallModal(true);
  };
  const confirmCall = () => {
    setShowCallModal(false);
    router.push("/call");
  }
  const getButtonStyle = (tabName) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: "bold",
    color: activeTab === tabName || hoveredTab === tabName ? "#22c55e" : "#9ca3af",
    cursor: "pointer",
    border: (activeTab === tabName || hoveredTab === tabName) ? "2px solid #166534" : "none",
    background: (activeTab === tabName || hoveredTab === tabName) ? "#181818" : "none",
    borderRadius: "8px",
    padding: "6px 10px",
    width:"120px",
    height:"6opx",
  });
  
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "black", color: "white" }}>
      <div style={{ textAlign: "center", padding: "16px", background: "black", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#22c55e" }}>WebRTC Caller App Home Page</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", background: "black", padding: "16px", boxShadow: "0px -4px 6px rgba(0,0,0,0.1)" }}>
        <button
          style={getButtonStyle("recentCalls")}
          onClick={() => { setActiveTab("recentCalls"); setShowDashboardOption(false); }}
          onMouseEnter={()=> setHoveredTab("recentCalls")}
          onMouseLeave={()=> setHoveredTab(null)}
        >
          <FaPhoneAlt size={24} style={{ marginBottom: "4px" }} />
          Recent Calls
        </button>

        <button
          style={getButtonStyle("contacts")}
          onClick={() => { setActiveTab("contacts"); setShowDashboardOption(false); }}
          onMouseEnter={()=> setHoveredTab("contacts")}
          onMouseLeave={()=> setHoveredTab(null)}
        >
          <FaUserFriends size={24} style={{ marginBottom: "4px" }} />
          Contacts
        </button>

        <button
          style={getButtonStyle("dashboard")}
          onClick={() => 
            {
              setActiveTab("dashboard");
              setShowDashboardOption(true);
              }}
          onMouseEnter={()=> setHoveredTab("dashboard")}
          onMouseLeave={()=>setHoveredTab(null)}
        >
          <FaTachometerAlt size={24} style={{ marginBottom: "4px" }} />
          Dashboard
        </button>
      </div>

      <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
        {showDashboardOption ? (
          <div style={{ textAlign: "center", padding: "20px", background: "#1a1a1a", borderRadius: "10px" }}>
            <h2 style={{ color: "#22c55e", marginBottom: "10px" }}>Want to go to Dashboard?</h2>
            <div style={{display: "flex", justifyContent:"center"}}>
            <button
              onClick={() => router.push("/dashboard")}
              style={{ display: "flex", alignItems: "center", background: "#22c55e", color: "white", padding: "10px 20px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", border: "none" }}
            >
              Click Here <FaArrowRight style={{ marginLeft: "10px" }} />
            </button>
            </div>
          </div>
        ) : (
          <>
            {activeTab === "recentCalls" &&
              recentCalls.map((call, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", background: "#1a1a1a", padding: "12px", borderRadius: "8px", marginBottom: "8px", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={call.profilePic} alt="Profile" style={{ width: "48px", height: "48px", borderRadius: "50%", marginRight: "16px" }} />
                    <div>
                      <p style={{ fontSize: "16px", fontWeight: "bold", color: "#22c55e" }}>{call.name}</p>
                      <p style={{ color: "#9ca3af", fontSize: "14px" }}>{call.time}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCall(call)}
                    style={{ background: "#22c55e", color: "white", padding: "6px 12px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", border: "none" }}
                  >Call</button>
                </div>
              ))}

            {activeTab === "contacts" &&
              contacts.map((contact, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", background: "#1a1a1a", padding: "12px", borderRadius: "8px", marginBottom: "8px", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={contact.profilePic} alt="Profile" style={{ width: "48px", height: "48px", borderRadius: "50%", marginRight: "16px" }} />
                    <div>
                      <p style={{ fontSize: "16px", fontWeight: "bold", color: "#22c55e" }}>{contact.name}</p>
                      <p style={{ color: "#9ca3af", fontSize: "14px" }}>{contact.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCall(contact)}
                    style={{ background: "#22c55e", color: "white", padding: "6px 12px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", border: "none" }}
                  >
                    Call
                  </button>
                </div>
              ))}
          </>
        )}
      </div>
    {/* Call Confirmation Modal */}
      {ShowCallModal && selectedContact && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ background: "#1a1a1a", padding: "20px", borderRadius: "10px", textAlign: "center", color: "white", width: "300px" }}>
            <img src={selectedContact.profilePic} alt="Profile" style={{ width: "80px", height: "80px", borderRadius: "50%", marginBottom: "12px" }} />
            <h2 style={{ color: "#22c55e" }}>{selectedContact.name}</h2>
            <p style={{ color: "#9ca3af", fontSize: "14px" }}>{selectedContact.email}</p>
            <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-around" }}>
              <button
                onClick={() => setShowCallModal(false)}
                style={{ background: "grey", color: "white", padding: "8px 16px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", border: "none" }}
              >
                Cancel
              </button>
              <button
                onClick={confirmCall}
                style={{ background: "#22c55e", color: "white", padding: "8px 16px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", border: "none" }}
              >
                Confirm Call
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
  );
}
